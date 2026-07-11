import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { AccountingClient } from "@/lib/conta/types";
import { createDocumentRequest } from "../actions";

const defaultChecklist = `Facturas de venta
Facturas de compra
Estados de cuenta bancarios
Recibos de gastos
Nómina / comprobantes de pago`;

function currentPeriod() {
  return new Date().toISOString().slice(0, 7);
}

export default async function NewRequestPage({ searchParams }: { searchParams: Promise<{ client?: string }> }) {
  if (!isSupabaseConfigured()) return <main className="mx-auto max-w-3xl px-4 py-16"><Card><CardTitle>Configura Supabase</CardTitle><p className="mt-2 text-sm text-slate-600">Activa Supabase para crear solicitudes.</p></Card></main>;
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
      <Card>
        <CardHeader>
          <CardTitle>Nueva solicitud mensual</CardTitle>
          <CardDescription>Define el periodo y los documentos que tu cliente debe subir.</CardDescription>
        </CardHeader>
        <form action={createDocumentRequest} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="client_id">Cliente</Label>
            <select id="client_id" name="client_id" required defaultValue={selectedClient ?? ""} className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950">
              <option value="" disabled>Selecciona un cliente</option>
              {(clients as AccountingClient[] | null)?.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="period">Periodo</Label>
              <Input id="period" name="period" defaultValue={currentPeriod()} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="due_date">Fecha límite</Label>
              <Input id="due_date" name="due_date" type="date" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="checklist">Checklist, un documento por línea</Label>
            <textarea id="checklist" name="checklist" defaultValue={defaultChecklist} className="min-h-48 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950" />
          </div>
          <Button type="submit">Crear solicitud</Button>
        </form>
      </Card>
    </main>
  );
}
