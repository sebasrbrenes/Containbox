import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { requestStatusLabel } from "@/lib/conta/status";
import type { AccountingClient, DocumentRequest } from "@/lib/conta/types";

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured()) return <main className="mx-auto max-w-3xl px-4 py-16"><Card><CardTitle>Configura Supabase</CardTitle><p className="mt-2 text-sm text-slate-600">Activa Supabase para ver clientes.</p></Card></main>;
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  const { data: client } = await supabase
    .from("accounting_clients")
    .select("*")
    .eq("id", id)
    .eq("user_id", data.user.id)
    .single();
  if (!client) notFound();

  const { data: requests } = await supabase
    .from("document_requests")
    .select("*")
    .eq("client_id", id)
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false });

  const typedClient = client as AccountingClient;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/dashboard/clients" className="text-sm font-semibold text-emerald-600">← Clientes</Link>
          <h1 className="mt-2 text-3xl font-bold">{typedClient.name}</h1>
          <p className="text-slate-600 dark:text-slate-300">{typedClient.contact_name ?? "Sin contacto"} · {typedClient.email ?? "Sin email"}</p>
        </div>
        <ButtonLink href={`/dashboard/requests/new?client=${typedClient.id}`}>Crear solicitud</ButtonLink>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Datos del cliente</CardTitle>
          <CardDescription>{typedClient.notes ?? "Sin notas"}</CardDescription>
        </CardHeader>
        <div className="grid gap-2 text-sm sm:grid-cols-3">
          <p><span className="font-semibold">Email:</span> {typedClient.email ?? "—"}</p>
          <p><span className="font-semibold">Teléfono:</span> {typedClient.phone ?? "—"}</p>
          <p><span className="font-semibold">Contacto:</span> {typedClient.contact_name ?? "—"}</p>
        </div>
      </Card>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Solicitudes</h2>
        <div className="grid gap-3">
          {(requests as DocumentRequest[] | null)?.map((request) => (
            <Link key={request.id} href={`/dashboard/requests/${request.id}`}>
              <Card className="transition hover:border-emerald-300">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>{request.title}</CardTitle>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Periodo {request.period} · vence {request.due_date ?? "sin fecha"}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{requestStatusLabel(request.status)}</span>
                </div>
              </Card>
            </Link>
          ))}
          {!requests?.length && <Card><CardTitle>Sin solicitudes</CardTitle><p className="mt-2 text-sm text-slate-600">Crea una solicitud mensual para compartir un link de carga.</p></Card>}
        </div>
      </section>
    </main>
  );
}
