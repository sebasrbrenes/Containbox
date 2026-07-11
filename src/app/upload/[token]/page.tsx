import { notFound } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AccountingClient, DocumentRequest, DocumentRequestItem } from "@/lib/conta/types";

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
          <CardTitle>Subir documentos</CardTitle>
          <CardDescription>{(client as AccountingClient | null)?.name ?? "Cliente"} · {typedRequest.period}</CardDescription>
        </CardHeader>
        {uploaded === "1" ? (
          <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
            Archivo recibido correctamente. Puedes subir otro documento si hace falta.
          </div>
        ) : null}
        <form action={`/api/public-upload/${token}`} method="post" encType="multipart/form-data" className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="item_id">Documento</label>
            <select id="item_id" name="item_id" className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950">
              <option value="">Carga general</option>
              {(items as DocumentRequestItem[] | null)?.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="uploader_name">Tu nombre</label>
            <input id="uploader_name" name="uploader_name" className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="file">Archivo</label>
            <input id="file" name="file" type="file" required className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950" />
          </div>
          <button className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950" type="submit">Subir archivo</button>
        </form>
      </Card>
    </main>
  );
}
