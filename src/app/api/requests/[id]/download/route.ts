import JSZip from "jszip";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { UploadedDocument } from "@/lib/conta/types";

export const dynamic = "force-dynamic";

function zipName(name: string) {
  return name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").slice(0, 140) || "file";
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: requestRow } = await supabase
    .from("document_requests")
    .select("id, title, period")
    .eq("id", id)
    .eq("user_id", data.user.id)
    .single();
  if (!requestRow) return NextResponse.json({ error: "Request not found" }, { status: 404 });

  const { data: documents } = await supabase.from("uploaded_documents").select("*").eq("request_id", id).order("created_at");
  const docs = (documents ?? []) as UploadedDocument[];
  if (docs.length === 0) return NextResponse.json({ error: "No documents found" }, { status: 404 });

  const admin = createAdminClient();
  const zip = new JSZip();

  for (const doc of docs) {
    const { data: blob } = await admin.storage.from("client-documents").download(doc.storage_path);
    if (!blob) continue;
    zip.file(`${doc.created_at.slice(0, 10)}-${zipName(doc.original_name)}`, await blob.arrayBuffer());
  }

  const content = await zip.generateAsync({ type: "uint8array" });
  const fileName = `conta-inbox-${String(requestRow.period)}.zip`;

  const body = new ArrayBuffer(content.byteLength);
  new Uint8Array(body).set(content);

  return new NextResponse(body, {
    headers: {
      "content-type": "application/zip",
      "content-disposition": `attachment; filename="${fileName}"`,
    },
  });
}
