import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { reportLovableError } from "@/lib/lovable-error-reporting";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Catches render-time errors in child components and shows a graceful fallback
 * instead of an empty white screen.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    reportLovableError(error, { boundary: "app_error_boundary" });
    console.error("[ErrorBoundary]", error);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4 py-12">
        <div className="max-w-md text-center">
          <h2 className="text-lg font-semibold text-foreground">
            This section couldn&apos;t load
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A component failed to render. The rest of the page is still working.
          </p>
          <Button onClick={this.reset} className="mt-6">
            Try again
          </Button>
        </div>
      </div>
    );
  }
}
