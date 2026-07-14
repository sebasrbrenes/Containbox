type ServerEnvKey =
  | "NEXT_PUBLIC_APP_URL"
  | "NEXT_PUBLIC_SUPABASE_URL"
  | "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  | "SUPABASE_SERVICE_ROLE_KEY"
  | "ONVO_API_KEY"
  | "ONVO_WEBHOOK_SECRET"
  | "ONVO_PRICE_ID"
  | "RESEND_API_KEY"
  | "RESEND_FROM_EMAIL"
  | "NEXT_PUBLIC_POSTHOG_KEY"
  | "NEXT_PUBLIC_POSTHOG_HOST"
  | "NEXT_PUBLIC_PLAUSIBLE_DOMAIN"
  | "NEXT_PUBLIC_SENTRY_DSN";

export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  onvoApiKey: process.env.ONVO_API_KEY,
  onvoWebhookSecret: process.env.ONVO_WEBHOOK_SECRET,
  onvoPriceId: process.env.ONVO_PRICE_ID,
  resendApiKey: process.env.RESEND_API_KEY,
  resendFromEmail: process.env.RESEND_FROM_EMAIL ?? "FileFollowup <hello@example.com>",
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
} as const;

export function hasEnv(...keys: ServerEnvKey[]) {
  return keys.every((key) => Boolean(process.env[key]));
}

export function missingEnv(...keys: ServerEnvKey[]) {
  return keys.filter((key) => !process.env[key]);
}

export function requireEnv(key: ServerEnvKey) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}
