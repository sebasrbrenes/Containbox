"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ClipboardList, FileArchive, FileUp, Mail, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialItems = [
  { id: "sales", label: "Sales invoices", status: "received" },
  { id: "purchases", label: "Purchase invoices", status: "pending" },
  { id: "bank", label: "Bank statements", status: "reviewed" },
  { id: "expenses", label: "Expense receipts", status: "pending" },
  { id: "payroll", label: "Payroll reports / proof of payment", status: "pending" },
];

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:ring-amber-900",
  received: "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:ring-blue-900",
  reviewed: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-900",
};

function nextStatus(status: string) {
  if (status === "pending") return "received";
  if (status === "received") return "reviewed";
  return "pending";
}

export default function DemoPage() {
  const [clientName, setClientName] = useState("Oak & Main Bakery");
  const [contactEmail, setContactEmail] = useState("admin@oakandmain.test");
  const [period, setPeriod] = useState("2026-07");
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState("");
  const [activity, setActivity] = useState([
    "Public link generated for Oak & Main Bakery",
    "Bank statements marked as reviewed",
    "Sales invoices received through the client portal",
  ]);

  const counts = useMemo(() => ({
    total: items.length,
    pending: items.filter((item) => item.status === "pending").length,
    received: items.filter((item) => item.status === "received").length,
    reviewed: items.filter((item) => item.status === "reviewed").length,
  }), [items]);

  function addItem() {
    const label = newItem.trim();
    if (!label) return;
    setItems((current) => [...current, { id: crypto.randomUUID(), label, status: "pending" }]);
    setActivity((current) => [`Document added: ${label}`, ...current].slice(0, 5));
    setNewItem("");
  }

  function cycleItem(id: string) {
    setItems((current) => current.map((item) => {
      if (item.id !== id) return item;
      const status = nextStatus(item.status);
      setActivity((entries) => [`${item.label}: ${status}`, ...entries].slice(0, 5));
      return { ...item, status };
    }));
  }

  function resetDemo() {
    setClientName("Oak & Main Bakery");
    setContactEmail("admin@oakandmain.test");
    setPeriod("2026-07");
    setItems(initialItems);
    setActivity([
      "Public link generated for Oak & Main Bakery",
      "Bank statements marked as reviewed",
      "Sales invoices received through the client portal",
    ]);
  }

  const publicLink = `filefollowup.test/upload/${clientName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "client"}-${period}`;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-600">Demo without Supabase</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">FileFollowup interactive demo</h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            Explore the complete workflow: create a client, build a monthly checklist, share a public link, update statuses, and use the key actions. This demo does not save real data.
          </p>
        </div>
        <Button type="button" variant="secondary" onClick={resetDemo}>
          <RotateCcw className="mr-2 h-4 w-4" /> Reset demo
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Metric icon={ClipboardList} label="Documents" value={counts.total} />
        <Metric icon={Mail} label="Pending" value={counts.pending} />
        <Metric icon={FileUp} label="Received" value={counts.received} />
        <Metric icon={CheckCircle2} label="Reviewed" value={counts.reviewed} />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle>1. Client and period</CardTitle>
            <CardDescription>The essential details for preparing a monthly request.</CardDescription>
          </CardHeader>
          <div className="grid gap-4">
            <Field label="Client / company" value={clientName} onChange={setClientName} />
            <Field label="Contact email" value={contactEmail} onChange={setContactEmail} type="email" />
            <Field label="Period" value={period} onChange={setPeriod} />
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-sm font-semibold">Public link to send by email or text</p>
            <p className="mt-2 break-all rounded-xl bg-white p-3 text-sm text-emerald-700 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">{publicLink}</p>
            <p className="mt-2 text-xs text-slate-500">In production, Supabase generates this link with a secure token.</p>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Monthly checklist</CardTitle>
            <CardDescription>Click a document to move it from pending → received → reviewed.</CardDescription>
          </CardHeader>
          <div className="grid gap-3">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => cycleItem(item.id)}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-300 dark:border-slate-800"
              >
                <span className="font-medium">{item.label}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyles[item.status]}`}>{item.status}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Input value={newItem} onChange={(event) => setNewItem(event.target.value)} placeholder="Add another document" />
            <Button type="button" onClick={addItem}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>3. Key workflow actions</CardTitle>
            <CardDescription>Preview the actions available in the live workflow.</CardDescription>
          </CardHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            <Action icon={Mail} title="Send reminder" detail={`To ${contactEmail || "client"}`} />
            <Action icon={FileArchive} title="Download ZIP" detail={`${counts.received + counts.reviewed} files ready`} />
            <Action icon={CheckCircle2} title="Close period" detail={counts.pending === 0 ? "Ready" : `${counts.pending} pending`} />
            <Action icon={ArrowRight} title="Create a live request" detail="Available when Supabase is connected" />
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>A quick view of the latest client-document activity.</CardDescription>
          </CardHeader>
          <div className="grid gap-3">
            {activity.map((entry) => (
              <div key={entry} className="rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-900">{entry}</div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number }) {
  return (
    <Card>
      <Icon className="mb-3 h-5 w-5 text-emerald-600" />
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
    </Card>
  );
}

function Action({ icon: Icon, title, detail }: { icon: React.ComponentType<{ className?: string }>; title: string; detail: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
      <Icon className="mb-3 h-5 w-5 text-emerald-600" />
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{detail}</p>
    </div>
  );
}
