import { Resend } from "resend";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { env, missingEnv } from "@/lib/env";
import type { AccountingClient, DocumentRequest, DocumentRequestItem } from "@/lib/conta/types";

export const dynamic = "force-dynamic";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const missing = missingEnv("RESEND_API_KEY");
  if (missing.length) return NextResponse.json({ error: `Missing env vars: ${missing.join(", ")}` }, { status: 503 });

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: requestRow } = await supabase
    .from("document_requests")
    .select("*")
    .eq("id", id)
    .eq("user_id", data.user.id)
    .single();
  if (!requestRow) return NextResponse.json({ error: "Request not found" }, { status: 404 });

  const requestData = requestRow as DocumentRequest;
  const [{ data: client }, { data: items }] = await Promise.all([
    supabase.from("accounting_clients").select("*").eq("id", requestData.client_id).eq("user_id", data.user.id).single(),
    supabase.from("document_request_items").select("*").eq("request_id", id).neq("status", "reviewed").order("sort_order"),
  ]);

  const typedClient = client as AccountingClient | null;
  if (!typedClient?.email) return NextResponse.json({ error: "The client does not have an email address" }, { status: 400 });

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  const { count: recentReminders } = await supabase
    .from("events")
    .select("id", { count: "exact", head: true })
    .eq("user_id", data.user.id)
    .eq("name", "reminder_sent")
    .contains("properties", { request_id: id })
    .gte("created_at", fiveMinutesAgo);
  if ((recentReminders ?? 0) > 0) {
    return NextResponse.json({ error: "A reminder was sent recently. Please wait five minutes before sending another." }, { status: 429 });
  }

  const uploadLink = `${env.appUrl.replace(/\/$/, "")}/upload/${requestData.public_token}`;
  const recipientName = escapeHtml(typedClient.contact_name ?? typedClient.name);
  const period = escapeHtml(requestData.period);
  const pendingItems = ((items ?? []) as DocumentRequestItem[]).map((item) => `<li>${escapeHtml(item.label)}</li>`).join("");
  const resend = new Resend(env.resendApiKey);
  const result = await resend.emails.send({
    from: env.resendFromEmail,
    to: typedClient.email,
    subject: `Documents needed for ${requestData.period}`,
    html: `<p>Hi ${recipientName},</p><p>Your bookkeeper has requested documents for <strong>${period}</strong>.</p><p>Upload your files here: <a href="${uploadLink}">${uploadLink}</a></p><p>Documents still needed:</p><ul>${pendingItems}</ul>`,
  });

  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 });
  const { error: eventError } = await supabase.from("events").insert({ user_id: data.user.id, name: "reminder_sent", properties: { request_id: id, client_id: typedClient.id } });
  if (eventError) console.error("Failed to record reminder event", { requestId: id, error: eventError.message });
  return NextResponse.redirect(new URL(`/dashboard/requests/${id}?reminder=sent`, request.url), { status: 303 });
}
