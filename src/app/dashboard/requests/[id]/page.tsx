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

export default async function RequestDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ reminder?: string }>;
}) {
  if (!isSupabaseConfigured()) return <main className="mx-auto max-w-3xl px-4 py-16"><Card><CardTitle>Configure Supabase</CardTitle><p className="mt-2 text-sm text-slate-600">Enable Supabase to view requests.</p></Card></main>;
  const { id } = await params;
  const { reminder } = await searchParams;
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
          <Link href={typedClient ? `/dashboard/clients/${typedClient.id}` : "/dashboard"} className="vintage-kicker">Back to client</Link>
          <h1 className="mt-4 text-5xl font-semibold">{typedRequest.title}</h1>
          <p className="text-slate-600 dark:text-slate-300">{typedClient?.name ?? "Client"} · {typedRequest.period} · {requestStatusLabel(typedRequest.status)}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <ButtonLink href={`/api/requests/${typedRequest.id}/download`} variant="secondary">Download ZIP</ButtonLink>
          <form action={markRequestCompleted.bind(null, typedRequest.id)}>
            <Button type="submit" variant="secondary">Mark as completed</Button>
          </form>
        </div>
      </div>

      <Card className="ledger-lines mb-6 border-slate-300">
        <CardHeader>
          <CardTitle>Public client link</CardTitle>
          <CardDescription>Share it by email or text. The client does not need an account.</CardDescription>
        </CardHeader>
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-100 p-3 font-mono text-sm break-all">{uploadUrl}</div>
        {reminder === "sent" ? (
          <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
            Reminder sent successfully.
          </p>
        ) : null}
        <form action={`/api/requests/${typedRequest.id}/reminder`} method="post" className="mt-4">
          <Button type="submit" variant="secondary">Send email reminder</Button>
        </form>
      </Card>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Checklist</CardTitle>
            <CardDescription>Track what is pending, received, and reviewed.</CardDescription>
          </CardHeader>
          <div className="grid gap-3">
            {(items as DocumentRequestItem[] | null)?.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-xl border border-slate-300 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-slate-500">{itemStatusLabel(item.status)}</p>
                </div>
                <form action={markItemReviewed.bind(null, item.id, typedRequest.id)}>
                  <Button type="submit" variant="secondary">Mark reviewed</Button>
                </form>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents received</CardTitle>
            <CardDescription>{uploads?.length ?? 0} files uploaded.</CardDescription>
          </CardHeader>
          <div className="grid gap-3">
            {(uploads as UploadedDocument[] | null)?.map((doc) => (
              <div key={doc.id} className="rounded-xl border border-slate-300 p-3 text-sm">
                <p className="font-semibold">{doc.original_name}</p>
                <p className="text-slate-500">{doc.mime_type ?? "file"} · {doc.size_bytes ?? 0} bytes</p>
                <a className="mt-2 inline-block font-semibold text-emerald-600" href={`/api/documents/${doc.id}/download`}>Download</a>
              </div>
            ))}
            {!uploads?.length && <p className="text-sm text-slate-500">No files yet. Share the public link with your client.</p>}
          </div>
        </Card>
      </section>
    </main>
  );
}
