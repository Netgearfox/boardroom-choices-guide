import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/boardroom", label: "Digital Boardroom" },
  { to: "/intelligence", label: "Gibraltar Intelligence" },
  { to: "/saved", label: "Saved Decisions" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const linkCls = "rounded-md px-3 py-2 text-muted-foreground hover:text-foreground";
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-red-premium font-display text-lg text-primary-foreground">R</span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold tracking-[0.18em]">THE ROCK BRAIN</span>
            <span className="hidden text-[0.65rem] tracking-widest text-muted-foreground sm:block">GIBRALTAR BUSINESS INTELLIGENCE</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-semibold lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className={linkCls} activeProps={{ className: "text-foreground" }}>{n.label}</Link>
          ))}
          <Link to="/ask" search={{}} className="ml-2 rounded-md bg-red-premium px-4 py-2 text-primary-foreground">Ask The Brain</Link>
        </nav>
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Link to="/ask" search={{}} className="rounded-md bg-red-premium px-3 py-2 text-sm font-semibold text-primary-foreground">Ask</Link>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="rounded-md border border-border p-2">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-border px-5 py-3 text-sm font-semibold lg:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }} className={linkCls} activeProps={{ className: "text-foreground" }}>{n.label}</Link>
          ))}
          <Link to="/ask" search={{}} onClick={() => setOpen(false)} className={linkCls}>Ask The Brain</Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
      The Rock Brain provides guidance, not legal or financial advice. Always consult a qualified Gibraltar professional.
    </footer>
  );
}

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl">{title}</h1>
      {text && <p className="mt-3 max-w-2xl text-muted-foreground">{text}</p>}
    </div>
  );
}
