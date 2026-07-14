import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: documentRow } = await supabase.from("uploaded_documents").select("*").eq("id", id).single();
  if (!documentRow) return NextResponse.json({ error: "Document not found" }, { status: 404 });

  const admin = createAdminClient();
  const { data: signed, error } = await admin.storage.from("client-documents").createSignedUrl(String(documentRow.storage_path), 60 * 10);
  if (error || !signed) return NextResponse.json({ error: error?.message ?? "Could not create download link" }, { status: 500 });

  return NextResponse.redirect(signed.signedUrl);
}
