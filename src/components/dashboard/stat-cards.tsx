import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Stat = { label: string; value: string; delta: string };

const MOCK: Stat[] = [
  { label: "Monthly active users", value: "12,847", delta: "+8.2%" },
  { label: "Conversion rate", value: "4.6%", delta: "+0.4 pts" },
  { label: "MRR", value: "$28,420", delta: "+12.1%" },
  { label: "Churn (30d)", value: "1.9%", delta: "-0.3 pts" },
];

/**
 * Renders skeleton placeholders with identical dimensions to the loaded cards
 * so there is zero cumulative layout shift on hydration.
 */
export function StatCards() {
  const [stats, setStats] = useState<Stat[] | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setStats(MOCK), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {(stats ?? MOCK).map((stat, i) => (
        <Card key={stat.label} className="border-border/60">
          <CardContent className="p-6">
            {stats ? (
              <>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{stat.value}</p>
                <p className="mt-1 text-xs text-primary">{stat.delta}</p>
              </>
            ) : (
              <div aria-hidden={i >= 0}>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-3 h-7 w-24" />
                <Skeleton className="mt-2 h-3 w-16" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
