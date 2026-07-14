import { Resend } from "resend";
import { env, missingEnv } from "@/lib/env";

export function getEmailMissingEnv() {
  return missingEnv("RESEND_API_KEY");
}

export async function sendWelcomeEmail(to: string) {
  const missing = getEmailMissingEnv();
  if (missing.length) {
    return { ok: false as const, status: 503, error: `Missing env vars: ${missing.join(", ")}` };
  }

  const resend = new Resend(env.resendApiKey);
  const result = await resend.emails.send({
    from: env.resendFromEmail,
    to,
    subject: "Welcome to FileFollowup",
    html: "<h1>Welcome</h1><p>Your FileFollowup workspace is ready to collect client documents.</p>",
  });

  if (result.error) {
    return { ok: false as const, status: 500, error: result.error.message };
  }

  return { ok: true as const, data: result.data };
}
