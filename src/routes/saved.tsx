import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { SiteHeader, SiteFooter, PageIntro } from "@/components/SiteHeader";
import { EXAMPLE_SAVED, loadSaved, removeSaved, type Saved } from "@/lib/examples";

const confCls: Record<string, string> = { High: "bg-success/15 text-success", Medium: "bg-gold/15 text-gold", Low: "bg-primary/15 text-primary" };

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Decisions — The Rock Brain" },
      { name: "description", content: "Revisit the business decisions you've put to The Rock Brain." },
      { property: "og:title", content: "Saved Decisions — The Rock Brain" },
      { property: "og:description", content: "Revisit your saved business decisions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const [mine, setMine] = useState<Saved[]>([]);
  useEffect(() => setMine(loadSaved()), []);
  const all = [...mine, ...EXAMPLE_SAVED.filter((e) => !mine.some((m) => m.question === e.question))];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-14">
        <PageIntro eyebrow="Saved Decisions" title="Your decision log." text="Every analysis you save appears here. Examples are included to show how it works." />
        <ul className="mt-10 space-y-3">
          {all.map((s) => {
            const isMine = mine.some((m) => m.id === s.id);
            return (
              <li key={s.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-border bg-card-premium p-5">
                <Link to="/ask" search={{ q: s.question }} className="min-w-0">
                  <p className="truncate font-semibold hover:text-primary">{s.question}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.date}{!isMine && " · Example"}</p>
                </Link>
                <div className="flex shrink-0 items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${confCls[s.confidence]}`}>{s.confidence}</span>
                  {isMine && (
                    <button aria-label="Remove" onClick={() => { removeSaved(s.id); setMine(loadSaved()); }} className="rounded-md p-2 text-muted-foreground hover:text-primary">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
