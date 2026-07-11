import { Resend } from "resend";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { env, missingEnv } from "@/lib/env";
import type { AccountingClient, DocumentRequest, DocumentRequestItem } from "@/lib/conta/types";

export const dynamic = "force-dynamic";

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const missing = missingEnv("RESEND_API_KEY");
  if (missing.length) return NextResponse.json({ error: `Missing env vars: ${missing.join(", ")}` }, { status: 503 });

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { data: requestRow } = await supabase
    .from("document_requests")
    .select("*")
    .eq("id", id)
    .eq("user_id", data.user.id)
    .single();
  if (!requestRow) return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 });

  const requestData = requestRow as DocumentRequest;
  const [{ data: client }, { data: items }] = await Promise.all([
    supabase.from("accounting_clients").select("*").eq("id", requestData.client_id).eq("user_id", data.user.id).single(),
    supabase.from("document_request_items").select("*").eq("request_id", id).neq("status", "reviewed").order("sort_order"),
  ]);

  const typedClient = client as AccountingClient | null;
  if (!typedClient?.email) return NextResponse.json({ error: "El cliente no tiene email" }, { status: 400 });

  const uploadLink = `${env.appUrl.replace(/\/$/, "")}/upload/${requestData.public_token}`;
  const pendingItems = ((items ?? []) as DocumentRequestItem[]).map((item) => `<li>${item.label}</li>`).join("");
  const resend = new Resend(env.resendApiKey);
  const result = await resend.emails.send({
    from: env.resendFromEmail,
    to: typedClient.email,
    subject: `Documentos pendientes para ${requestData.period}`,
    html: `<p>Hola ${typedClient.contact_name ?? typedClient.name},</p><p>Tu contador te solicita los documentos de <strong>${requestData.period}</strong>.</p><p>Sube los archivos aquí: <a href="${uploadLink}">${uploadLink}</a></p><p>Documentos pendientes:</p><ul>${pendingItems}</ul>`,
  });

  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 });
  await supabase.from("events").insert({ user_id: data.user.id, name: "reminder_sent", properties: { request_id: id, client_id: typedClient.id } });
  return NextResponse.json({ ok: true });
}
