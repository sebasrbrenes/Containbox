"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function createAccountingClient(formData: FormData) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("No autorizado");

  const name = text(formData, "name");
  if (!name) throw new Error("El nombre del cliente es obligatorio");

  const { data: inserted, error } = await supabase
    .from("accounting_clients")
    .insert({
      user_id: data.user.id,
      name,
      contact_name: text(formData, "contact_name"),
      email: text(formData, "email"),
      phone: text(formData, "phone"),
      notes: text(formData, "notes"),
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/clients");
  redirect(`/dashboard/clients/${inserted.id}`);
}
