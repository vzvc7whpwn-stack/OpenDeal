import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container mx-auto grid gap-8 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-semibold tracking-tight">Lumen</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            AI-powered product analytics that turn raw events into revenue decisions.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Product</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Overview</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="mailto:hello@example.com" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container mx-auto px-6 py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Lumen. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
