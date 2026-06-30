import { createFileRoute } from "@tanstack/react-router";
import { ErrorBoundary } from "@/components/error-boundary";
import DealsApp from "@/components/DealsApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OpenDeal Route Scanner — Liquidation & Open-Box Deals Across the USA" },
      {
        name: "description",
        content:
          "Browse live open-box, refurbished, and liquidation pallet deals in major US metros. Compare local comps, calculate pickup drive time, and earn promoter commissions on every referred sale.",
      },
      {
        name: "keywords",
        content:
          "liquidation pallets, open box deals, refurbished electronics, affiliate commission, deal scanner",
      },
      { property: "og:title", content: "OpenDeal Route Scanner — Liquidation & Open-Box Deals" },
      {
        property: "og:description",
        content:
          "Find open-box and clearance deals near you, compare nearby comps, and earn referral commissions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "OpenDeal Route Scanner" },
      {
        name: "twitter:description",
        content: "Open-box and liquidation deals with built-in promoter earnings.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "OpenDeal Route Scanner",
          applicationCategory: "ShoppingApplication",
          operatingSystem: "Web",
          description:
            "Real-time scanner for open-box, refurbished, and liquidation deals across major US metros with built-in promoter commission tracking.",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ErrorBoundary>
      <DealsApp />
    </ErrorBoundary>
  );
}
