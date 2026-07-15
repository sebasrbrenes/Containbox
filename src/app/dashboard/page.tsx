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
          <p className="vintage-kicker mb-3">FileFollowup workspace</p>
          <h1 className="text-5xl font-semibold tracking-tight">Dashboard</h1>
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
      <section className="grid border-y border-slate-400 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="border-b border-slate-400 py-6 last:border-b-0 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0">
            <p className="sheet-label text-slate-600">{metric.label}</p>
            <p className="mt-2 font-display text-5xl font-semibold text-emerald-800">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-500">{metric.hint}</p>
          </div>
        ))}
      </section>
      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between">
          <div><p className="sheet-label text-emerald-800">Working desk</p><h2 className="mt-2 text-3xl font-semibold">Where do you need to go?</h2></div>
          <p className="hidden text-xs text-slate-500 sm:block">FILEFOLLOWUP / WORKSPACE</p>
        </div>
        <div className="border-t border-slate-500">
          <Link className="group grid gap-2 border-b border-slate-400 py-6 sm:grid-cols-[0.8fr_1.2fr_auto] sm:items-center" href="/dashboard/clients">
            <h3 className="text-2xl font-semibold">Client book</h3>
            <p className="text-sm text-slate-600">Create clients and keep their contact details together.</p>
            <span className="text-sm font-semibold text-emerald-800 group-hover:translate-x-1">Open →</span>
          </Link>
          <Link className="group grid gap-2 border-b border-slate-400 py-6 sm:grid-cols-[0.8fr_1.2fr_auto] sm:items-center" href="/dashboard/requests/new">
            <h3 className="text-2xl font-semibold">Monthly requests</h3>
            <p className="text-sm text-slate-600">Write a checklist and produce a no-login upload link.</p>
            <span className="text-sm font-semibold text-emerald-800 group-hover:translate-x-1">Create →</span>
          </Link>
        </div>
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
