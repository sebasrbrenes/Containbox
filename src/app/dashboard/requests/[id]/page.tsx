import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { env } from "@/lib/env";
import { itemStatusLabel, requestStatusLabel } from "@/lib/conta/status";
import type { AccountingClient, DocumentRequest, DocumentRequestItem, UploadedDocument } from "@/lib/conta/types";
import { markItemReviewed, markRequestCompleted } from "../actions";

export const dynamic = "force-dynamic";

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured()) return <main className="mx-auto max-w-3xl px-4 py-16"><Card><CardTitle>Configura Supabase</CardTitle><p className="mt-2 text-sm text-slate-600">Activa Supabase para ver solicitudes.</p></Card></main>;
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  const { data: request } = await supabase
    .from("document_requests")
    .select("*")
    .eq("id", id)
    .eq("user_id", data.user.id)
    .single();
  if (!request) notFound();

  const typedRequest = request as DocumentRequest;
  const [{ data: client }, { data: items }, { data: uploads }] = await Promise.all([
    supabase.from("accounting_clients").select("*").eq("id", typedRequest.client_id).eq("user_id", data.user.id).single(),
    supabase.from("document_request_items").select("*").eq("request_id", id).order("sort_order"),
    supabase.from("uploaded_documents").select("*").eq("request_id", id).order("created_at", { ascending: false }),
  ]);

  const typedClient = client as AccountingClient | null;
  const uploadUrl = `${env.appUrl.replace(/\/$/, "")}/upload/${typedRequest.public_token}`;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href={typedClient ? `/dashboard/clients/${typedClient.id}` : "/dashboard"} className="text-sm font-semibold text-emerald-600">← Volver</Link>
          <h1 className="mt-2 text-3xl font-bold">{typedRequest.title}</h1>
          <p className="text-slate-600 dark:text-slate-300">{typedClient?.name ?? "Cliente"} · {typedRequest.period} · {requestStatusLabel(typedRequest.status)}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <ButtonLink href={`/api/requests/${typedRequest.id}/download`} variant="secondary">Descargar ZIP</ButtonLink>
          <form action={markRequestCompleted.bind(null, typedRequest.id)}>
            <Button type="submit" variant="secondary">Marcar completada</Button>
          </form>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Link público para el cliente</CardTitle>
          <CardDescription>Compártelo por WhatsApp o email. El cliente no necesita cuenta.</CardDescription>
        </CardHeader>
        <div className="rounded-xl bg-slate-100 p-3 text-sm break-all dark:bg-slate-900">{uploadUrl}</div>
        <form action={`/api/requests/${typedRequest.id}/reminder`} method="post" className="mt-4">
          <Button type="submit" variant="secondary">Enviar recordatorio por email</Button>
        </form>
      </Card>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Checklist</CardTitle>
            <CardDescription>Controla lo pendiente, recibido y revisado.</CardDescription>
          </CardHeader>
          <div className="grid gap-3">
            {(items as DocumentRequestItem[] | null)?.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-slate-500">{itemStatusLabel(item.status)}</p>
                </div>
                <form action={markItemReviewed.bind(null, item.id, typedRequest.id)}>
                  <Button type="submit" variant="secondary">Revisado</Button>
                </form>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentos recibidos</CardTitle>
            <CardDescription>{uploads?.length ?? 0} archivos cargados.</CardDescription>
          </CardHeader>
          <div className="grid gap-3">
            {(uploads as UploadedDocument[] | null)?.map((doc) => (
              <div key={doc.id} className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800">
                <p className="font-semibold">{doc.original_name}</p>
                <p className="text-slate-500">{doc.mime_type ?? "archivo"} · {doc.size_bytes ?? 0} bytes</p>
                <a className="mt-2 inline-block font-semibold text-emerald-600" href={`/api/documents/${doc.id}/download`}>Descargar</a>
              </div>
            ))}
            {!uploads?.length && <p className="text-sm text-slate-500">Todavía no hay archivos. Comparte el link público.</p>}
          </div>
        </Card>
      </section>
    </main>
  );
}
