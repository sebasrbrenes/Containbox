import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  const signature = request.headers.get("onvo-signature");
  const body = await request.text();

  if (!env.onvoWebhookSecret) {
    return NextResponse.json({ error: "Missing ONVO_WEBHOOK_SECRET" }, { status: 503 });
  }

  if (!signature) {
    return NextResponse.json({ error: "Missing Onvo signature" }, { status: 400 });
  }

  // TODO: replace with Onvo's official signature verification when enabling production webhooks.
  console.info("Onvo webhook received", { bytes: body.length, signaturePresent: Boolean(signature) });

  return NextResponse.json({ received: true });
}
