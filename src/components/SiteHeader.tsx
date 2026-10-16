import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-red-premium font-display text-lg text-primary-foreground">R</span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold tracking-[0.18em]">THE ROCK BRAIN</span>
            <span className="hidden text-[0.65rem] tracking-widest text-muted-foreground sm:block">GIBRALTAR BUSINESS INTELLIGENCE</span>
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-1 text-sm font-semibold">
          <Link to="/" activeOptions={{ exact: true }} className="rounded-md px-3 py-2 text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground" }}>Home</Link>
          <Link to="/ask" search={{}} className="rounded-md bg-red-premium px-4 py-2 text-primary-foreground">Ask The Brain</Link>
        </nav>
      </div>
    </header>
  );
}
