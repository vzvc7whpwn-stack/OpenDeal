import { createFileRoute } from "@tanstack/react-router";
import { ErrorBoundary } from "@/components/error-boundary";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { Pricing } from "@/components/marketing/pricing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — AI Product Analytics That Pay For Themselves" },
      {
        name: "description",
        content:
          "Lumen turns raw user events into revenue decisions. Spot churn, ship the right features, and grow MRR — all in one analytics stack.",
      },
      { property: "og:title", content: "Lumen — AI Product Analytics" },
      {
        property: "og:description",
        content: "Turn raw events into revenue decisions with AI-powered product analytics.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Lumen",
          applicationCategory: "BusinessApplication",
          offers: [
            { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
            { "@type": "Offer", name: "Pro", price: "29", priceCurrency: "USD" },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <ErrorBoundary><Hero /></ErrorBoundary>
        <ErrorBoundary><Features /></ErrorBoundary>
        <ErrorBoundary><Pricing /></ErrorBoundary>
      </main>
      <SiteFooter />
    </div>
  );
}
