import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function safeName(name: string) {
  return name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").slice(0, 120) || "archivo";
}

function optionalText(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function POST(request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const supabase = createAdminClient();
  const formData = await request.formData();
  const file = formData.get("file");
  const itemId = optionalText(formData.get("item_id"));
  const uploaderName = optionalText(formData.get("uploader_name"));

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Archivo requerido" }, { status: 400 });
  }

  if (file.size > 25 * 1024 * 1024) {
    return NextResponse.json({ error: "Archivo demasiado grande. Máximo 25MB." }, { status: 400 });
  }

  const { data: requestRow } = await supabase
    .from("document_requests")
    .select("id, status")
    .eq("public_token", token)
    .eq("status", "open")
    .single();

  if (!requestRow) return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 });

  const requestId = String(requestRow.id);
  const key = `${requestId}/${itemId ?? "general"}/${Date.now()}-${safeName(file.name)}`;
  const bytes = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage.from("client-documents").upload(key, bytes, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

  const { error: insertError } = await supabase.from("uploaded_documents").insert({
    request_id: requestId,
    item_id: itemId,
    storage_path: key,
    original_name: file.name,
    mime_type: file.type,
    size_bytes: file.size,
    uploader_name: uploaderName,
  });
  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });

  if (itemId) {
    await supabase.from("document_request_items").update({ status: "received" }).eq("id", itemId).eq("request_id", requestId);
  }

  return NextResponse.redirect(new URL(`/upload/${token}?uploaded=1`, request.url), { status: 303 });
}
