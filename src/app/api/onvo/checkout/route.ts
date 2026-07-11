import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/onvo";

export async function GET() {
  const result = await createCheckoutSession();

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const checkoutUrl = result.data?.url ?? result.data?.checkout_url;
  if (checkoutUrl) {
    return NextResponse.redirect(checkoutUrl);
  }

  return NextResponse.json(result.data);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const result = await createCheckoutSession({ customerEmail: body.email });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data);
}
