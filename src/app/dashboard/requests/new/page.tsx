import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { AccountingClient } from "@/lib/conta/types";
import { createDocumentRequest } from "../actions";

const defaultChecklist = `Sales invoices
Purchase invoices
Bank statements
Expense receipts
Payroll reports / proof of payment`;

function currentPeriod() {
  return new Date().toISOString().slice(0, 7);
}

export default async function NewRequestPage({ searchParams }: { searchParams: Promise<{ client?: string }> }) {
  if (!isSupabaseConfigured()) return <main className="mx-auto max-w-3xl px-4 py-16"><Card><CardTitle>Configure Supabase</CardTitle><p className="mt-2 text-sm text-slate-600">Enable Supabase to create requests.</p></Card></main>;
  const { client: selectedClient } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  const { data: clients } = await supabase
    .from("accounting_clients")
    .select("*")
    .eq("user_id", data.user.id)
    .order("name");

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Card className="border-slate-300 p-7 shadow-[8px_8px_0_rgba(89,67,49,0.08)] sm:p-9">
        <CardHeader>
          <p className="vintage-kicker mb-3">Prepare the month</p>
          <CardTitle className="text-4xl">New monthly request</CardTitle>
          <CardDescription>Choose the period and documents your client needs to upload.</CardDescription>
        </CardHeader>
        <form action={createDocumentRequest} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="client_id">Client</Label>
            <select id="client_id" name="client_id" required defaultValue={selectedClient ?? ""} className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm">
              <option value="" disabled>Select a client</option>
              {(clients as AccountingClient[] | null)?.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="period">Period</Label>
              <Input id="period" name="period" defaultValue={currentPeriod()} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="due_date">Due date</Label>
              <Input id="due_date" name="due_date" type="date" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="checklist">Checklist, one document per line</Label>
            <textarea id="checklist" name="checklist" defaultValue={defaultChecklist} className="ledger-lines min-h-48 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm leading-[2.8rem]" />
          </div>
          <Button type="submit">Create request</Button>
        </form>
      </Card>
    </main>
  );
}
