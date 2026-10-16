import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, PageIntro } from "@/components/SiteHeader";
import { AREAS } from "@/components/Boardroom";

const QUESTIONS: Record<string, string> = {
  Money: "Can I afford to expand?",
  Operations: "Should I hire another employee?",
  Market: "How should I market my business in Gibraltar?",
  Technology: "How can technology improve my business?",
  Rules: "What risks am I missing?",
};
const ROLES: Record<string, string> = {
  Money: "Your finance director: protects cash, margin and return.",
  Operations: "Your COO: makes sure the business can actually deliver.",
  Market: "Your commercial director: knows customers and competitors on the Rock.",
  Technology: "Your CTO: finds tools that save time and reduce risk.",
  Rules: "Your compliance lead: keeps you on the right side of Gibraltar law.",
};

export const Route = createFileRoute("/boardroom")({
  head: () => ({
    meta: [
      { title: "Digital Boardroom — The Rock Brain" },
      { name: "description", content: "Five advisors — Money, Operations, Market, Technology and Rules — examine every Gibraltar business decision." },
      { property: "og:title", content: "Digital Boardroom — The Rock Brain" },
      { property: "og:description", content: "Five advisors examine every Gibraltar business decision." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Boardroom,
});

function Boardroom() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <PageIntro eyebrow="Digital Boardroom" title="Your advisory board, on demand." text="Every decision is tested by five specialist perspectives, each grounded in how business really works in Gibraltar." />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {AREAS.map(({ name, icon: Icon, items }) => (
            <div key={name} className="flex flex-col rounded-2xl border border-border bg-card-premium p-7">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary"><Icon className="h-6 w-6" /></span>
                <div className="min-w-0">
                  <h2 className="text-sm font-extrabold tracking-[0.2em] uppercase">{name}</h2>
                  <p className="text-sm text-muted-foreground">{ROLES[name]}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {items.map((i) => <span key={i} className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">{i}</span>)}
              </div>
              <Link to="/ask" search={{ q: QUESTIONS[name] }} className="mt-6 text-sm font-semibold text-primary hover:underline">
                Try: “{QUESTIONS[name]}” →
              </Link>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
