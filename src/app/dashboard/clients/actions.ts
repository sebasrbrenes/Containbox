"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function text(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key);
  if (typeof value !== "string" || !value.trim()) return null;
  const normalized = value.trim();
  if (normalized.length > maxLength) throw new Error(`${key.replaceAll("_", " ")} is too long`);
  return normalized;
}

export async function createAccountingClient(formData: FormData) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Unauthorized");

  const name = text(formData, "name", 200);
  if (!name) throw new Error("Client name is required");
  const email = text(formData, "email", 320);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Client email is invalid");

  const { data: inserted, error } = await supabase
    .from("accounting_clients")
    .insert({
      user_id: data.user.id,
      name,
      contact_name: text(formData, "contact_name", 200),
      email,
      phone: text(formData, "phone", 50),
      notes: text(formData, "notes", 2000),
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/clients");
  redirect(`/dashboard/clients/${inserted.id}`);
}
