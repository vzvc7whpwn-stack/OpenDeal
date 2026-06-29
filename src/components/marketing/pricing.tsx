import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  cta: string;
  features: string[];
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "For solo builders validating an idea.",
    cta: "Start free",
    features: [
      "Up to 10k monthly events",
      "1 project · 2 dashboards",
      "7-day data retention",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    cadence: "per month",
    description: "For teams shipping and monetizing in production.",
    cta: "Upgrade to Pro",
    featured: true,
    features: [
      "Up to 1M monthly events",
      "Unlimited dashboards",
      "12-month data retention",
      "AI insights & anomaly alerts",
      "Workflow triggers (Slack, email, webhooks)",
      "Priority support",
    ],
  },
];

export function Pricing({ heading = true }: { heading?: boolean }) {
  return (
    <section className="border-b border-border/60" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-6 py-24">
        {heading && (
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="pricing-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Simple pricing that scales with you
            </h2>
            <p className="mt-4 text-muted-foreground">
              Start free. Upgrade the day you need more — not before.
            </p>
          </div>
        )}
        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "relative flex flex-col border-border/60",
                tier.featured && "border-primary shadow-lg",
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most popular
                </span>
              )}
              <CardContent className="flex flex-1 flex-col p-8">
                <h3 className="text-lg font-medium">{tier.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">/ {tier.cadence}</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="mt-8 w-full"
                  variant={tier.featured ? "default" : "outline"}
                >
                  <Link to="/dashboard">{tier.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
