import { createFileRoute, useNavigate } from "@tanstack/react-router";
import rock from "@/assets/rock.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { QuestionBox } from "@/components/QuestionBox";
import { AREAS } from "@/components/Boardroom";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Rock Brain — Gibraltar Business Intelligence" },
      { name: "description", content: "Your Gibraltar-first digital business advisory board. One Rock. One Economy. One Digital Brain." },
      { property: "og:title", content: "The Rock Brain — Gibraltar Business Intelligence" },
      { property: "og:description", content: "Your Gibraltar-first digital business advisory board." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="relative overflow-hidden">
        <img src={rock} alt="The Rock of Gibraltar at dusk" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-bottom opacity-70" />
        <div className="absolute inset-0 bg-hero" />
        <div className="relative mx-auto max-w-4xl px-5 pb-20 pt-20 text-center sm:pt-28">
          <p className="eyebrow">Gibraltar Business Intelligence</p>
          <h1 className="mt-4 font-display text-6xl leading-none sm:text-8xl">The Rock Brain</h1>
          <p className="mt-5 text-sm font-semibold tracking-[0.2em] text-gold uppercase">One Rock. One Economy. One Digital Brain.</p>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">Your Gibraltar-first digital business advisory board.</p>
          <div className="mt-10 text-left">
            <QuestionBox onSubmit={(q) => navigate({ to: "/ask", search: { q } })} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow">The Digital Boardroom</p>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl">Five advisors. One decision.</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">Every question is examined from five angles, through a Gibraltar lens.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {AREAS.map(({ name, icon: Icon, items }) => (
            <div key={name} className="group rounded-2xl border border-border bg-card-premium p-6 transition hover:-translate-y-1 hover:border-primary/60">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-5 text-sm font-extrabold tracking-[0.2em] uppercase">{name}</h3>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        The Rock Brain provides guidance, not legal or financial advice. Always consult a qualified Gibraltar professional.
      </footer>
    </div>
  );
}
