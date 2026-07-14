import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { MAX_FILES_PER_HOUR, MAX_FILES_PER_REQUEST, validateUploadContent, validateUploadMetadata } from "@/lib/uploads";

export const dynamic = "force-dynamic";

function safeName(name: string) {
  return name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").slice(0, 120) || "file";
}

function optionalText(value: FormDataEntryValue | null, maxLength: number) {
  if (typeof value !== "string" || !value.trim()) return null;
  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const supabase = createAdminClient();
  const formData = await request.formData();
  const file = formData.get("file");
  const itemId = optionalText(formData.get("item_id"), 100);
  const uploaderName = optionalText(formData.get("uploader_name"), 200);

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const metadataError = validateUploadMetadata(file);
  if (metadataError) return NextResponse.json({ error: metadataError }, { status: 400 });

  const { data: requestRow } = await supabase
    .from("document_requests")
    .select("id, status")
    .eq("public_token", token)
    .eq("status", "open")
    .single();

  if (!requestRow) return NextResponse.json({ error: "Request not found" }, { status: 404 });

  const requestId = String(requestRow.id);
  if (itemId) {
    const { data: requestItem } = await supabase
      .from("document_request_items")
      .select("id")
      .eq("id", itemId)
      .eq("request_id", requestId)
      .single();
    if (!requestItem) return NextResponse.json({ error: "The selected checklist item does not belong to this request" }, { status: 400 });
  }

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const [{ count: totalFiles }, { count: recentFiles }] = await Promise.all([
    supabase.from("uploaded_documents").select("id", { count: "exact", head: true }).eq("request_id", requestId),
    supabase.from("uploaded_documents").select("id", { count: "exact", head: true }).eq("request_id", requestId).gte("created_at", oneHourAgo),
  ]);
  if ((totalFiles ?? 0) >= MAX_FILES_PER_REQUEST) return NextResponse.json({ error: "This request has reached its file limit" }, { status: 429 });
  if ((recentFiles ?? 0) >= MAX_FILES_PER_HOUR) return NextResponse.json({ error: "Too many files were uploaded recently. Please try again later." }, { status: 429 });

  const key = `${requestId}/${itemId ?? "general"}/${Date.now()}-${safeName(file.name)}`;
  const bytes = await file.arrayBuffer();
  const contentError = validateUploadContent(file.name, bytes);
  if (contentError) return NextResponse.json({ error: contentError }, { status: 400 });

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
  if (insertError) {
    await supabase.storage.from("client-documents").remove([key]);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  if (itemId) {
    await supabase.from("document_request_items").update({ status: "received" }).eq("id", itemId).eq("request_id", requestId);
  }

  return NextResponse.redirect(new URL(`/upload/${token}?uploaded=1`, request.url), { status: 303 });
}
