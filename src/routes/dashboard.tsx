import { createFileRoute } from "@tanstack/react-router";
import { ErrorBoundary } from "@/components/error-boundary";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StatCards } from "@/components/dashboard/stat-cards";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Lumen" },
      { name: "description", content: "A preview of your Lumen analytics dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-6 py-10">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Placeholder workspace — wire this up to your live data once you&apos;ve signed in.
            </p>
          </header>
          <ErrorBoundary>
            <StatCards />
          </ErrorBoundary>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
