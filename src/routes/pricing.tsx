import { createFileRoute } from "@tanstack/react-router";
import { ErrorBoundary } from "@/components/error-boundary";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Pricing } from "@/components/marketing/pricing";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Lumen" },
      {
        name: "description",
        content: "Free for solo builders. $29/mo Pro for teams shipping in production. No credit card required to start.",
      },
      { property: "og:title", content: "Pricing — Lumen" },
      { property: "og:description", content: "Simple pricing that scales with you. Start free, upgrade when you need to." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border/60">
          <div className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Pricing</h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Pick the plan that fits today. Move up or down any time — no contracts, no surprises.
            </p>
          </div>
        </section>
        <ErrorBoundary>
          <Pricing heading={false} />
        </ErrorBoundary>
      </main>
      <SiteFooter />
    </div>
  );
}
