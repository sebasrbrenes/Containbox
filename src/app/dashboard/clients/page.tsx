import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { AccountingClient } from "@/lib/conta/types";
import { createAccountingClient } from "./actions";

export default async function ClientsPage() {
  if (!isSupabaseConfigured()) return <SetupNeeded />;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  const { data: clients } = await supabase
    .from("accounting_clients")
    .select("*")
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Nuevo cliente</CardTitle>
          <CardDescription>Crea un cliente contable para solicitar documentos mensuales.</CardDescription>
        </CardHeader>
        <form action={createAccountingClient} className="grid gap-4">
          <Field name="name" label="Empresa / cliente" required />
          <Field name="contact_name" label="Contacto" />
          <Field name="email" label="Email" type="email" />
          <Field name="phone" label="Teléfono" />
          <div className="grid gap-2">
            <Label htmlFor="notes">Notas</Label>
            <textarea id="notes" name="notes" className="min-h-24 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950" />
          </div>
          <Button type="submit">Crear cliente</Button>
        </form>
      </Card>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Clientes</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">{clients?.length ?? 0} registrados</p>
          </div>
          <Link href="/dashboard" className="text-sm font-semibold text-emerald-600">Dashboard</Link>
        </div>
        <div className="grid gap-3">
          {(clients as AccountingClient[] | null)?.map((client) => (
            <Link key={client.id} href={`/dashboard/clients/${client.id}`}>
              <Card className="transition hover:border-emerald-300">
                <CardTitle>{client.name}</CardTitle>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{client.email ?? "Sin email"}</p>
              </Card>
            </Link>
          ))}
          {!clients?.length && <Card><CardTitle>Aún no hay clientes</CardTitle><p className="mt-2 text-sm text-slate-600">Crea el primero para generar una solicitud mensual.</p></Card>}
        </div>
      </section>
    </main>
  );
}

function SetupNeeded() {
  return <main className="mx-auto max-w-3xl px-4 py-16"><Card><CardTitle>Configura Supabase</CardTitle><p className="mt-2 text-sm text-slate-600">Agrega NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY para activar clientes.</p></Card></main>;
}

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} />
    </div>
  );
}
