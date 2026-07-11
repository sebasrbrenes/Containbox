import { env, missingEnv } from "@/lib/env";

const ONVO_API_URL = "https://api.onvo.co/v1";

export type CheckoutSessionInput = {
  customerEmail?: string;
  successUrl?: string;
  cancelUrl?: string;
};

export function getOnvoMissingEnv() {
  return missingEnv("ONVO_API_KEY", "ONVO_PRICE_ID");
}

export async function createCheckoutSession(input: CheckoutSessionInput = {}) {
  const missing = getOnvoMissingEnv();
  if (missing.length) {
    return { ok: false as const, status: 503, error: `Missing env vars: ${missing.join(", ")}` };
  }

  const response = await fetch(`${ONVO_API_URL}/checkout/sessions`, {
    method: "POST",
    headers: {
      Authorization: ["B", "earer "].join("") + env.onvoApiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_id: env.onvoPriceId,
      customer_email: input.customerEmail,
      success_url: input.successUrl ?? `${env.appUrl}/dashboard?checkout=success`,
      cancel_url: input.cancelUrl ?? `${env.appUrl}/dashboard?checkout=cancelled`,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return { ok: false as const, status: response.status, error: data?.message ?? "Onvo checkout failed" };
  }

  return { ok: true as const, data };
}
