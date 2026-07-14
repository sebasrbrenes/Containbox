import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) return <SetupState />;

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  const [{ count: clientCount }, { count: openRequestCount }, { count: uploadCount }] = await Promise.all([
    supabase.from("accounting_clients").select("id", { count: "exact", head: true }).eq("user_id", data.user.id),
    supabase.from("document_requests").select("id", { count: "exact", head: true }).eq("user_id", data.user.id).eq("status", "open"),
    supabase.from("uploaded_documents").select("id", { count: "exact", head: true }),
  ]);

  const metrics = [
    { label: "Clients", value: String(clientCount ?? 0), hint: "Active bookkeeping clients" },
    { label: "Open requests", value: String(openRequestCount ?? 0), hint: "Pending periods" },
    { label: "Documents received", value: String(uploadCount ?? 0), hint: "Uploaded files" },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-600">FileFollowup</p>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Organize monthly documents by client and period.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <ButtonLink href="/dashboard/clients" variant="secondary">New client</ButtonLink>
          <ButtonLink href="/dashboard/requests/new">New request</ButtonLink>
          <form action={signOut}>
            <Button type="submit" variant="ghost">Sign out</Button>
          </form>
        </div>
      </div>
      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader>
              <CardDescription>{metric.label}</CardDescription>
              <CardTitle className="text-3xl">{metric.value}</CardTitle>
            </CardHeader>
            <p className="text-sm text-slate-500">{metric.hint}</p>
          </Card>
        ))}
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle>Clients</CardTitle>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Create clients and save their contact details.</p>
          <Link className="mt-4 inline-block text-sm font-semibold text-emerald-600" href="/dashboard/clients">Open clients →</Link>
        </Card>
        <Card>
          <CardTitle>Monthly requests</CardTitle>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Create checklists and share upload links.</p>
          <Link className="mt-4 inline-block text-sm font-semibold text-emerald-600" href="/dashboard/requests/new">Create request →</Link>
        </Card>
      </section>
    </main>
  );
}

function SetupState() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard ready for Supabase</CardTitle>
          <CardDescription>Add your credentials to `.env.local` to enable authentication.</CardDescription>
        </CardHeader>
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100">
{`NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...`}
        </pre>
        <ButtonLink href="/login" className="mt-5">Go to login</ButtonLink>
      </Card>
    </main>
  );
}
