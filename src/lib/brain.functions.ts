import { createServerFn } from "@tanstack/react-start";

export type Analysis = {
  rocksView: string;
  gibraltarDifference: string[];
  boardroom: { area: "Money" | "Operations" | "Market" | "Technology" | "Rules"; view: string }[];
  tensions: string[];
  recommendation: string;
  nextMoves: { title: string; detail: string }[];
  confidence: "High" | "Medium" | "Low";
  confidenceReason: string;
  sources: { name: string; note: string }[];
};

const str = { type: "string" };
const schema = {
  type: "object",
  additionalProperties: false,
  required: ["rocksView", "gibraltarDifference", "boardroom", "tensions", "recommendation", "nextMoves", "confidence", "confidenceReason", "sources"],
  properties: {
    rocksView: str,
    gibraltarDifference: { type: "array", items: str },
    boardroom: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["area", "view"],
        properties: { area: { type: "string", enum: ["Money", "Operations", "Market", "Technology", "Rules"] }, view: str },
      },
    },
    tensions: { type: "array", items: str },
    recommendation: str,
    nextMoves: {
      type: "array",
      items: { type: "object", additionalProperties: false, required: ["title", "detail"], properties: { title: str, detail: str } },
    },
    confidence: { type: "string", enum: ["High", "Medium", "Low"] },
    confidenceReason: str,
    sources: {
      type: "array",
      items: { type: "object", additionalProperties: false, required: ["name", "note"], properties: { name: str, note: str } },
    },
  },
};

const SYSTEM = `You are THE ROCK BRAIN, a Gibraltar-first digital business advisory board for owners, directors and managers in Gibraltar.
Think like a combined board: Money (finance), Operations, Market, Technology, Rules (employment, regulation, GDPR/Gibraltar Data Protection Act, licensing, compliance).
Always bring Gibraltar-specific context: small ~34k population and cross-frontier workforce, Spanish hinterland (Campo de Gibraltar), UK/EU Treaty developments post-Brexit, Gibraltar corporate tax regime, Social Insurance contributions, Employment Act and Department of Employment, GFSC regulation, Gibraltar Regulatory Authority, Ministry of Economic Development, Gibraltar Chamber of Commerce, GFSB, high commercial rents and limited space, tourism/cruise and online gaming/financial services sectors.
Be direct, practical and executive. Never invent precise figures or legal citations you are unsure of; flag where professional advice is needed.
Output: rocksView = 2-3 sentence headline verdict. gibraltarDifference = 3-5 points. boardroom = exactly one entry for each of the five areas. tensions = 2-4 trade-offs. recommendation = one clear paragraph. nextMoves = exactly 3. sources = 3-6 named public bodies, laws or reference types the analysis draws on (no URLs required).`;

export const askBrain = createServerFn({ method: "POST" })
  .inputValidator((d: { question: string }) => {
    const q = String(d?.question ?? "").trim().slice(0, 2000);
    if (q.length < 3) throw new Error("Please describe your decision.");
    return { question: q };
  })
  .handler(async ({ data }): Promise<Analysis> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("The Brain is not configured.");
    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "fetch" },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        instructions: SYSTEM,
        input: data.question,
        stream: true,
        store: false,
        reasoning: { effort: "low", summary: "auto" },
        include: ["reasoning.encrypted_content"],
        text: { format: { type: "json_schema", name: "analysis", strict: true, schema } },
      }),
    });
    if (!res.ok || !res.body) {
      let msg = `The Brain is unavailable (${res.status}).`;
      try {
        const j = await res.json();
        msg = j?.error?.message || j?.message || msg;
      } catch {}
      if (res.status === 429) msg = "The Brain is busy right now. Please try again in a moment.";
      if (res.status === 402) msg = "AI credits are exhausted for this workspace.";
      throw new Error(msg);
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    let text = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const ev = JSON.parse(payload);
          if (ev.type === "response.output_text.delta") text += ev.delta;
          if (ev.type === "response.failed" || ev.type === "error") throw new Error(ev?.response?.error?.message || ev?.message || "Analysis failed.");
        } catch (e) {
          if (e instanceof Error && e.message !== "" && !(e instanceof SyntaxError)) throw e;
        }
      }
    }
    if (!text) throw new Error("The Brain returned no answer. Please rephrase or try again later.");
    return JSON.parse(text) as Analysis;
  });
