import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const SUGGESTIONS = [
  "Should I hire another employee?",
  "Can I afford to expand?",
  "How can I improve my cash flow?",
  "What risks am I missing?",
  "How should I market my business in Gibraltar?",
  "How can technology improve my business?",
  "How could Gibraltar Treaty developments affect my business?",
];

export function QuestionBox({ initial = "", onSubmit, busy }: { initial?: string; onSubmit: (q: string) => void; busy?: boolean }) {
  const [q, setQ] = useState(initial);
  const go = (v: string) => v.trim().length > 2 && !busy && onSubmit(v.trim());
  return (
    <div className="w-full">
      <form
        onSubmit={(e) => { e.preventDefault(); go(q); }}
        className="rounded-2xl border border-input bg-card-premium p-2 focus-within:border-primary"
      >
        <label htmlFor="q" className="eyebrow block px-4 pt-3">What decision are you facing?</label>
        <textarea
          id="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); go(q); } }}
          rows={3}
          placeholder="Describe your situation — sector, size, what you're weighing up…"
          className="w-full resize-none bg-transparent px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <div className="flex justify-end px-2 pb-2">
          <button disabled={busy || q.trim().length < 3} className="inline-flex items-center gap-2 rounded-xl bg-red-premium px-5 py-3 text-sm font-bold text-primary-foreground disabled:opacity-50">
            {busy ? "Convening the board…" : "Ask The Brain"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
      <div className="mt-5 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button key={s} type="button" onClick={() => { setQ(s); go(s); }} className="rounded-full border border-border bg-secondary/60 px-4 py-2 text-left text-sm text-muted-foreground transition hover:border-primary hover:text-foreground">
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
