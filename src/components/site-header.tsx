import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <span>Lumen</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/" className="transition-colors hover:text-foreground" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>
            Home
          </Link>
          <Link to="/pricing" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            Pricing
          </Link>
          <Link to="/dashboard" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/pricing">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/pricing">Start free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
