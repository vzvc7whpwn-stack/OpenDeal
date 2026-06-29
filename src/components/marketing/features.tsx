import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Bot, Lock, Rocket, Workflow, Zap } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Funnels in seconds",
    body: "Drag-and-drop funnel builder with cohort overlays. No SQL, no waiting on data engineering.",
  },
  {
    icon: Bot,
    title: "AI insights",
    body: "Ask plain-English questions about your data. Lumen explains the why, not just the what.",
  },
  {
    icon: Zap,
    title: "Real-time events",
    body: "Stream events the moment they happen. Watch a launch land in real time, not tomorrow.",
  },
  {
    icon: Workflow,
    title: "Workflow triggers",
    body: "Fire emails, Slack alerts, or webhooks the instant a user hits a meaningful milestone.",
  },
  {
    icon: Lock,
    title: "Privacy-first",
    body: "Hosted on your region. SOC 2 ready. GDPR & CCPA tooling baked in.",
  },
  {
    icon: Rocket,
    title: "Ship faster",
    body: "Lightweight SDKs for web, mobile, and server. Install in a single afternoon.",
  },
];

export function Features() {
  return (
    <section className="border-b border-border/60 bg-card/30">
      <div className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to grow revenue
          </h2>
          <p className="mt-4 text-muted-foreground">
            One stack for analytics, insights, and activation — so you can stop stitching tools together.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="border-border/60 transition-colors hover:border-border">
              <CardContent className="p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
