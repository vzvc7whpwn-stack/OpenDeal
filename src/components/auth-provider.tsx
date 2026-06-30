import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  /** True until the initial session has been resolved from storage. */
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface Props {
  children: ReactNode;
}

/**
 * Global Supabase auth bootstrap.
 *
 * - Hydrates from persisted session BEFORE rendering children, so a hard
 *   refresh on a protected view never flickers between logged-out and
 *   logged-in states.
 * - Listens to onAuthStateChange exactly once so sign-in / sign-out / token
 *   refresh propagate everywhere through context.
 * - Wraps the initial bootstrap in try/catch so a transient network error
 *   during getSession() can't take down the whole app.
 */
export function AuthProvider({ children }: Props) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    // Subscribe FIRST so we don't miss an event that fires during hydration.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setLoading(false);
    });

    // Then hydrate from storage.
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        setSession(data.session);
      })
      .catch((err) => {
        console.error("[auth] getSession failed", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextValue = {
    user: session?.user ?? null,
    session,
    loading,
    signOut: async () => {
      await supabase.auth.signOut();
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <AuthBootSkeleton /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

function AuthBootSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="min-h-screen flex items-center justify-center bg-neutral-50"
    >
      <div className="flex items-center gap-3 text-neutral-500 text-sm">
        <span className="h-4 w-4 rounded-full border-2 border-neutral-300 border-t-neutral-800 animate-spin" />
        <span>Loading session…</span>
      </div>
    </div>
  );
}
