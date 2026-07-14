import { notFound } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AccountingClient, DocumentRequest, DocumentRequestItem } from "@/lib/conta/types";
import { itemStatusLabel } from "@/lib/conta/status";
import { ACCEPTED_UPLOAD_INPUT } from "@/lib/uploads";

export const dynamic = "force-dynamic";

export default async function PublicUploadPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ uploaded?: string }>;
}) {
  const { token } = await params;
  const { uploaded } = await searchParams;
  const supabase = createAdminClient();

  const { data: request } = await supabase
    .from("document_requests")
    .select("*")
    .eq("public_token", token)
    .eq("status", "open")
    .single();
  if (!request) notFound();

  const typedRequest = request as DocumentRequest;
  const [{ data: client }, { data: items }] = await Promise.all([
    supabase.from("accounting_clients").select("*").eq("id", typedRequest.client_id).single(),
    supabase.from("document_request_items").select("*").eq("request_id", typedRequest.id).order("sort_order"),
  ]);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload documents</CardTitle>
          <CardDescription>{(client as AccountingClient | null)?.name ?? "Client"} · {typedRequest.period}</CardDescription>
        </CardHeader>
        {uploaded === "1" ? (
          <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
            File received successfully. You can upload another document if needed.
          </div>
        ) : null}
        <div className="mb-6 grid gap-2">
          <p className="text-sm font-semibold">Request checklist</p>
          {(items as DocumentRequestItem[] | null)?.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-800">
              <span>{item.label}</span>
              <span className="text-slate-500">{itemStatusLabel(item.status)}</span>
            </div>
          ))}
        </div>
        <form action={`/api/public-upload/${token}`} method="post" encType="multipart/form-data" className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="item_id">Document</label>
            <select id="item_id" name="item_id" className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950">
              <option value="">General upload</option>
              {(items as DocumentRequestItem[] | null)?.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="uploader_name">Your name</label>
            <input id="uploader_name" name="uploader_name" className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="file">File</label>
            <input id="file" name="file" type="file" accept={ACCEPTED_UPLOAD_INPUT} required className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950" />
            <p className="text-xs text-slate-500">PDF, image, CSV, Excel, or Word files up to 25 MB.</p>
          </div>
          <button className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950" type="submit">Upload file</button>
        </form>
      </Card>
    </main>
  );
}
