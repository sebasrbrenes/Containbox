"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function defaultTitle(period: string) {
  return `Documents ${period}`;
}

export async function createDocumentRequest(formData: FormData) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Unauthorized");

  const clientId = text(formData, "client_id");
  const period = text(formData, "period");
  const dueDate = text(formData, "due_date");
  const checklistRaw = text(formData, "checklist") ?? "";

  if (!clientId || !period) throw new Error("Client and period are required");
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(period)) throw new Error("Period must use the YYYY-MM format");
  if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) throw new Error("Due date is invalid");
  if (checklistRaw.length > 10000) throw new Error("Checklist is too long");

  const checklistLabels = checklistRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (checklistLabels.length > 100) throw new Error("A request can contain up to 100 checklist items");
  if (checklistLabels.some((label) => label.length > 300)) throw new Error("Checklist item labels can contain up to 300 characters");

  const { data: client } = await supabase
    .from("accounting_clients")
    .select("id")
    .eq("id", clientId)
    .eq("user_id", data.user.id)
    .single();
  if (!client) throw new Error("Client not found");

  const { data: request, error } = await supabase
    .from("document_requests")
    .insert({
      user_id: data.user.id,
      client_id: clientId,
      title: defaultTitle(period),
      period,
      due_date: dueDate,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  const items = checklistLabels.map((label, index) => ({ request_id: request.id, label, sort_order: index }));

  if (items.length > 0) {
    const { error: itemError } = await supabase.from("document_request_items").insert(items);
    if (itemError) {
      await supabase.from("document_requests").delete().eq("id", request.id).eq("user_id", data.user.id);
      throw new Error(itemError.message);
    }
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/requests/new");
  redirect(`/dashboard/requests/${request.id}`);
}

export async function markItemReviewed(itemId: string, requestId: string) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Unauthorized");

  const { data: request } = await supabase
    .from("document_requests")
    .select("id")
    .eq("id", requestId)
    .eq("user_id", data.user.id)
    .single();
  if (!request) throw new Error("Request not found");

  const { error } = await supabase
    .from("document_request_items")
    .update({ status: "reviewed" })
    .eq("id", itemId)
    .eq("request_id", requestId);
  if (error) throw new Error(error.message);

  revalidatePath(`/dashboard/requests/${requestId}`);
}

export async function markRequestCompleted(requestId: string) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("document_requests")
    .update({ status: "completed" })
    .eq("id", requestId)
    .eq("user_id", data.user.id);
  if (error) throw new Error(error.message);

  revalidatePath(`/dashboard/requests/${requestId}`);
  revalidatePath("/dashboard");
}
