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
      <Card className="border-slate-300 lg:sticky lg:top-24 lg:self-start">
        <CardHeader>
          <p className="vintage-kicker mb-3">Add to the ledger</p>
          <CardTitle className="text-3xl">New client</CardTitle>
          <CardDescription>Create a bookkeeping client to request monthly documents.</CardDescription>
        </CardHeader>
        <form action={createAccountingClient} className="grid gap-4">
          <Field name="name" label="Company / client" required />
          <Field name="contact_name" label="Contact" />
          <Field name="email" label="Email" type="email" />
          <Field name="phone" label="Phone" />
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea id="notes" name="notes" className="min-h-24 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm" />
          </div>
          <Button type="submit">Create client</Button>
        </form>
      </Card>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="vintage-kicker mb-2">Your client book</p>
            <h1 className="text-4xl font-semibold">Clients</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">{clients?.length ?? 0} registered</p>
          </div>
          <Link href="/dashboard" className="text-xs font-bold uppercase tracking-[0.09em] text-emerald-700">Dashboard</Link>
        </div>
        <div className="border-t border-slate-400">
          {(clients as AccountingClient[] | null)?.map((client) => (
            <Link key={client.id} href={`/dashboard/clients/${client.id}`} className="group grid gap-1 border-b border-slate-400 py-5 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
              <h2 className="text-xl font-semibold">{client.name}</h2>
              <p className="text-sm text-slate-600">{client.email ?? "No email"}</p>
              <span className="text-sm font-semibold text-emerald-800 group-hover:translate-x-1">Open →</span>
            </Link>
          ))}
          {!clients?.length && <Card><CardTitle>No clients yet</CardTitle><p className="mt-2 text-sm text-slate-600">Create your first client to generate a monthly request.</p></Card>}
        </div>
      </section>
    </main>
  );
}

function SetupNeeded() {
  return <main className="mx-auto max-w-3xl px-4 py-16"><Card><CardTitle>Configure Supabase</CardTitle><p className="mt-2 text-sm text-slate-600">Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable clients.</p></Card></main>;
}

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} />
    </div>
  );
}
