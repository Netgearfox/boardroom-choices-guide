import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { SiteHeader, SiteFooter, PageIntro } from "@/components/SiteHeader";

const STATS = [
  { label: "Population", value: "~34,000", trend: "flat", note: "Small, relationship-driven market" },
  { label: "Daily frontier workers", value: "~15,000", trend: "up", note: "Key source of labour" },
  { label: "Cruise calls / year", value: "~200", trend: "up", note: "Seasonal retail & hospitality demand" },
  { label: "Commercial rents", value: "High", trend: "up", note: "Space is a constraint on growth" },
];

const BRIEFINGS = [
  { tag: "Treaty", title: "UK–EU Treaty on Gibraltar", body: "Frontier fluidity, customs alignment and taxation changes are expected to reshape costs and market access over the coming years.", impact: "High" },
  { tag: "Workforce", title: "Recruitment remains tight", body: "Employers across hospitality, retail and professional services report difficulty filling roles locally.", impact: "Medium" },
  { tag: "Technology", title: "Cyber risk rising for SMEs", body: "Phishing and invoice fraud remain the most common threats. Microsoft 365 security defaults are an easy first step.", impact: "Medium" },
  { tag: "Regulation", title: "Data protection expectations", body: "The Gibraltar Regulatory Authority continues to emphasise GDPR-aligned practices for customer and employee data.", impact: "Medium" },
  { tag: "Market", title: "Tourism-led footfall", body: "Main Street and Ocean Village trade remains closely linked to cruise schedules and day visitors.", impact: "Low" },
  { tag: "Money", title: "Cost pressures", body: "Energy, imported goods and wage inflation continue to squeeze margins for small operators.", impact: "High" },
];

const impactCls: Record<string, string> = { High: "bg-primary/15 text-primary", Medium: "bg-gold/15 text-gold", Low: "bg-success/15 text-success" };

export const Route = createFileRoute("/intelligence")({
  head: () => ({
    meta: [
      { title: "Gibraltar Intelligence — The Rock Brain" },
      { name: "description", content: "Key indicators and briefings on the Gibraltar economy, Treaty, workforce, technology and regulation." },
      { property: "og:title", content: "Gibraltar Intelligence — The Rock Brain" },
      { property: "og:description", content: "Key indicators and briefings on the Gibraltar economy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Intelligence,
});

function Intelligence() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <PageIntro eyebrow="Gibraltar Intelligence" title="The Rock, at a glance." text="The local context behind every recommendation. Example indicators shown for illustration." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => {
            const T = s.trend === "up" ? TrendingUp : s.trend === "down" ? TrendingDown : Minus;
            return (
              <div key={s.label} className="rounded-2xl border border-border bg-card-premium p-6">
                <div className="flex items-center justify-between text-xs font-semibold tracking-widest text-muted-foreground uppercase">{s.label}<T className="h-4 w-4 text-primary" /></div>
                <p className="mt-3 font-display text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
              </div>
            );
          })}
        </div>
        <h2 className="mt-16 font-display text-3xl">Briefings</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BRIEFINGS.map((b) => (
            <article key={b.title} className="rounded-2xl border border-border bg-card-premium p-6">
              <div className="flex items-center justify-between">
                <span className="eyebrow">{b.tag}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${impactCls[b.impact]}`}>{b.impact} impact</span>
              </div>
              <h3 className="mt-3 text-lg font-bold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
