// Centralized env validation. Imported once at app boot.
// Vite replaces `import.meta.env.VITE_*` at build time; missing values come
// through as the literal string "undefined" or empty string.

export type RequiredEnvVar = {
  key: string;
  value: string | undefined;
  hint: string;
};

const raw = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL as string | undefined,
  VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined,
};

const REQUIRED: RequiredEnvVar[] = [
  {
    key: "VITE_SUPABASE_URL",
    value: raw.VITE_SUPABASE_URL,
    hint: "Lovable Cloud project URL (e.g. https://xxxx.supabase.co).",
  },
  {
    key: "VITE_SUPABASE_PUBLISHABLE_KEY",
    value: raw.VITE_SUPABASE_PUBLISHABLE_KEY,
    hint: "Publishable (anon) Supabase key — safe to ship to the browser.",
  },
];

function isPresent(v: string | undefined): boolean {
  return typeof v === "string" && v.length > 0 && v !== "undefined";
}

export const missingEnvVars: RequiredEnvVar[] = REQUIRED.filter((v) => !isPresent(v.value));

export const envOk = missingEnvVars.length === 0;

export const env = {
  SUPABASE_URL: raw.VITE_SUPABASE_URL ?? "",
  SUPABASE_PUBLISHABLE_KEY: raw.VITE_SUPABASE_PUBLISHABLE_KEY ?? "",
};
