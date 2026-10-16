import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, AlertTriangle, Target, BookOpen, Gauge, Bookmark, BookmarkCheck } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { QuestionBox } from "@/components/QuestionBox";
import { areaIcon } from "@/components/Boardroom";
import { getAnalysis, saveDecision, type Analysis } from "@/lib/examples";

export const Route = createFileRoute("/ask")({
  validateSearch: (s: Record<string, unknown>): { q?: string | undefined } => ({ q: typeof s["q"] === "string" ? (s["q"] as string) : undefined }),
  head: () => ({
    meta: [
      { title: "Ask The Brain — The Rock Brain" },
      { name: "description", content: "Get an executive analysis of your business decision with Gibraltar-specific context." },
      { property: "og:title", content: "Ask The Brain — The Rock Brain" },
      { property: "og:description", content: "An executive analysis of your business decision, Gibraltar-first." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ask,
});

function Ask() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/ask" });
  const [result, setResult] = useState<Analysis | null>(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(false);
    if (!q) { setResult(null); return; }
    setBusy(true);
    const t = setTimeout(() => { setResult(getAnalysis(q)); setBusy(false); }, 1400);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-12">
        <p className="eyebrow">Ask The Brain</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Put it to the board.</h1>
        <div className="mt-8">
          <QuestionBox key={q ?? ""} initial={q ?? ""} busy={busy} onSubmit={(v) => navigate({ search: { q: v } })} />
        </div>
        {busy && <Thinking />}
        {result && !busy && q && (
          <>
            <div className="mt-10 flex justify-end">
              <button
                onClick={() => { saveDecision({ id: crypto.randomUUID(), question: q, date: new Date().toISOString().slice(0, 10), confidence: result.confidence }); setSaved(true); }}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:border-primary"
              >
                {saved ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
                {saved ? "Saved to decisions" : "Save decision"}
              </button>
            </div>
            <Result a={result} question={q} />
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function Thinking() {
  return (
    <div className="mt-12 rounded-2xl border border-border bg-card-premium p-8">
      <p className="eyebrow">The board is in session</p>
      <div className="mt-6 grid grid-cols-5 gap-3">
        {["Money", "Operations", "Market", "Technology", "Rules"].map((n, i) => {
          const Icon = areaIcon(n);
          return (
            <div key={n} className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
              <span className="grid h-12 w-12 animate-pulse place-items-center rounded-xl bg-primary/15 text-primary" style={{ animationDelay: `${i * 150}ms` }}><Icon className="h-5 w-5" /></span>
              <span className="hidden sm:block">{n}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon?: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card-premium p-6 sm:p-8">
      <h2 className="flex items-center gap-2 eyebrow">{Icon && <Icon className="h-4 w-4" />}{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Result({ a, question }: { a: Analysis; question: string }) {
  const level = { High: 3, Medium: 2, Low: 1 }[a.confidence];
  const color = { High: "bg-success", Medium: "bg-gold", Low: "bg-primary" }[a.confidence];
  return (
    <div className="mt-12 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-2xl bg-red-premium p-8 text-primary-foreground">
        <p className="text-xs font-bold tracking-[0.25em] uppercase opacity-80">The Rock's View</p>
        <p className="mt-2 text-sm opacity-80">“{question}”</p>
        <p className="mt-4 font-display text-2xl leading-snug sm:text-3xl">{a.rocksView}</p>
      </div>

      <Section title="What makes this different in Gibraltar" icon={MapPin}>
        <ul className="space-y-3">
          {a.gibraltarDifference.map((d, i) => (
            <li key={i} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /><span>{d}</span></li>
          ))}
        </ul>
      </Section>

      <Section title="The Digital Boardroom">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {a.boardroom.map((b) => {
            const Icon = areaIcon(b.area);
            return (
              <div key={b.area} className="rounded-xl border border-border bg-secondary/50 p-5">
                <div className="flex items-center gap-2 text-sm font-extrabold tracking-[0.15em] uppercase"><Icon className="h-4 w-4 text-primary" />{b.area}</div>
                <p className="mt-3 text-sm text-muted-foreground">{b.view}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Points of tension" icon={AlertTriangle}>
        <div className="grid gap-3 sm:grid-cols-2">
          {a.tensions.map((t, i) => <div key={i} className="rounded-xl border-l-2 border-gold bg-secondary/50 p-4 text-sm">{t}</div>)}
        </div>
      </Section>

      <Section title="The Brain's recommendation" icon={Target}>
        <p className="text-lg leading-relaxed">{a.recommendation}</p>
      </Section>

      <Section title="Your next three moves">
        <ol className="grid gap-3 md:grid-cols-3">
          {a.nextMoves.map((n, i) => (
            <li key={i} className="rounded-xl border border-border bg-secondary/50 p-5">
              <span className="font-display text-4xl text-primary">0{i + 1}</span>
              <p className="mt-2 font-bold">{n.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{n.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <div className="grid gap-5 md:grid-cols-2">
        <Section title="Confidence" icon={Gauge}>
          <div className="flex items-center gap-4">
            <div className="flex items-end gap-1.5">
              {[1, 2, 3].map((n) => (
                <span key={n} className={`w-4 rounded-sm ${n <= level ? color : "bg-muted"}`} style={{ height: `${n * 12 + 8}px` }} />
              ))}
            </div>
            <span className="text-2xl font-extrabold">{a.confidence}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{a.confidenceReason}</p>
        </Section>
        <Section title="Sources used" icon={BookOpen}>
          <ul className="space-y-2 text-sm">
            {a.sources.map((s, i) => <li key={i}><span className="font-semibold">{s.name}</span> <span className="text-muted-foreground">— {s.note}</span></li>)}
          </ul>
        </Section>
      </div>
      <p className="text-center text-xs text-muted-foreground">Guidance only — not legal or financial advice. Consult a qualified Gibraltar professional.</p>
    </div>
  );
}
