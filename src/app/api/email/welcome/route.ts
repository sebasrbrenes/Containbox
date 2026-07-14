import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!body.email || typeof body.email !== "string") {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }
  if (body.email.toLowerCase() !== data.user.email.toLowerCase()) {
    return NextResponse.json({ error: "You can only send a welcome email to your own account" }, { status: 403 });
  }

  const result = await sendWelcomeEmail(body.email);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data);
}
