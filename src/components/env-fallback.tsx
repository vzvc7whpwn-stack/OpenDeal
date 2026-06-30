import type { RequiredEnvVar } from "@/lib/env";

interface Props {
  missing: RequiredEnvVar[];
}

export function EnvFallback({ missing }: Props) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="max-w-lg w-full bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 space-y-5">
        <header className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
            Configuration required
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-950">
            The app isn't fully configured yet
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            One or more required environment variables are missing. The app
            won't load until they're set. Add them to your <code className="text-xs font-mono bg-neutral-100 px-1 py-0.5 rounded">.env</code> file (locally)
            or your deployment provider's environment settings, then redeploy.
          </p>
        </header>

        <ul className="space-y-3">
          {missing.map((v) => (
            <li
              key={v.key}
              className="border border-neutral-200 rounded-xl p-3 bg-neutral-50/60"
            >
              <code className="block text-xs font-mono font-bold text-neutral-950">
                {v.key}
              </code>
              <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                {v.hint}
              </p>
            </li>
          ))}
        </ul>

        <p className="text-[11px] text-neutral-500 leading-relaxed">
          On Lovable Cloud these are wired up automatically. On Vercel,
          add each variable in Project Settings → Environment Variables and
          redeploy.
        </p>
      </div>
    </main>
  );
}
