import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, PageIntro } from "@/components/SiteHeader";

const WHO = ["Gibraltar business owners", "Managing Directors", "CEOs", "General Managers", "Start-up founders", "Charity leaders", "Public sector decision makers"];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Rock Brain" },
      { name: "description", content: "The Rock Brain is a Gibraltar-first digital advisory board for business owners, directors and managers." },
      { property: "og:title", content: "About — The Rock Brain" },
      { property: "og:description", content: "A Gibraltar-first digital advisory board." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-14">
        <PageIntro eyebrow="About" title="One Rock. One Economy. One Digital Brain." />
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>The Rock Brain helps business owners, directors and managers in Gibraltar make better business decisions.</p>
          <p>It feels like having a digital advisory board — combining financial, operational, commercial, technology and regulatory thinking with genuine Gibraltar context: the frontier, the Treaty, the size of the market and the rules that apply here.</p>
        </div>
        <section className="mt-12 rounded-2xl border border-border bg-card-premium p-8">
          <h2 className="eyebrow">Built for</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {WHO.map((w) => <span key={w} className="rounded-full border border-border bg-secondary px-4 py-2 text-sm">{w}</span>)}
          </div>
        </section>
        <section className="mt-6 rounded-2xl border border-border bg-card-premium p-8">
          <h2 className="eyebrow">Important</h2>
          <p className="mt-3 text-muted-foreground">The Rock Brain offers guidance to support your thinking. It does not replace advice from a qualified Gibraltar accountant, lawyer or regulator.</p>
        </section>
        <Link to="/ask" search={{}} className="mt-10 inline-block rounded-xl bg-red-premium px-6 py-3 font-bold text-primary-foreground">Ask The Brain</Link>
      </main>
      <SiteFooter />
    </div>
  );
}
