import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/onvo";
import { createClient } from "@/lib/supabase/server";

async function authenticatedEmail() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user?.email ?? null;
}

export async function GET() {
  const email = await authenticatedEmail();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const result = await createCheckoutSession({ customerEmail: email });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const checkoutUrl = result.data?.url ?? result.data?.checkout_url;
  if (checkoutUrl) {
    return NextResponse.redirect(checkoutUrl);
  }

  return NextResponse.json(result.data);
}

export async function POST() {
  const email = await authenticatedEmail();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const result = await createCheckoutSession({ customerEmail: email });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data);
}
