import { ArrowRight, Bell, CheckCircle2, Download, FileUp, MessageSquareWarning, Send, ShieldCheck, TimerReset, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  { title: "Create the client", description: "Add their name, email, and accounting period in under a minute." },
  { title: "Send one link", description: "The client uploads documents without creating an account or installing anything." },
  { title: "See what is missing", description: "Track each checklist item as pending, received, or reviewed." },
  { title: "Download everything", description: "Download the month's documents in one organized ZIP file." },
];

const benefits = [
  { icon: MessageSquareWarning, title: "Less chasing", description: "Stop requesting the same documents by email or text every month." },
  { icon: FileUp, title: "Simple uploads", description: "Clients receive one link and upload files from any device." },
  { icon: Bell, title: "Reminders", description: "Follow up with clients who still owe documents." },
  { icon: CheckCircle2, title: "Clear status", description: "See pending, received, and reviewed for every requested document." },
  { icon: Download, title: "Monthly ZIP", description: "Download everything by client and period so you can work faster." },
  { icon: ShieldCheck, title: "Secure foundation", description: "Authentication, database, and private storage powered by Supabase." },
];

const prices = [
  { name: "Starter", price: "$19/month", detail: "Up to 20 clients" },
  { name: "Studio", price: "$49/month", detail: "Up to 100 clients" },
  { name: "Firm", price: "$99/month", detail: "Up to 300 clients" },
];

const salesActions = [
  { icon: TimerReset, title: "Three-minute demo", description: "See the client, checklist, public link, pending items, and ZIP without configuring Supabase." },
  { icon: Users, title: "First 50 prospects", description: "Independent bookkeepers and small firms that still request documents by email or text." },
  { icon: Send, title: "Simple offer", description: "Guided trial plus initial setup. Goal: two pilot users before building more." },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="mb-4 inline-flex w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
            For independent bookkeepers and small accounting firms
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Collect client documents without the monthly chase.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            ContaInbox gives you monthly checklists, no-login upload links, and reminders so clients can send statements, receipts, and reports on time.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/demo">
              View interactive demo <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/dashboard" variant="secondary">Create your workspace</ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary">See how it works</ButtonLink>
          </div>
        </div>
        <Card className="bg-slate-950 text-white dark:bg-white dark:text-slate-950">
          <CardHeader>
            <CardDescription className="text-slate-300 dark:text-slate-600">Monthly workflow</CardDescription>
            <CardTitle className="text-2xl">From scattered files to one checklist</CardTitle>
          </CardHeader>
          <div className="grid gap-3 text-sm">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-start gap-3 rounded-xl bg-white/10 p-3 dark:bg-slate-950/10">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">{index + 1}</span>
                <div>
                  <p className="font-semibold">{step.title}</p>
                  <p className="text-slate-300 dark:text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section id="how-it-works" className="border-y border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">A simple workflow for closing each month with fewer follow-up messages.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <Card key={step.title}>
                <p className="mb-4 text-sm font-bold text-emerald-600">Step {index + 1}</p>
                <CardTitle>{step.title}</CardTitle>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">Built to save time on the monthly close</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">A focused workflow for requesting, receiving, and organizing client documents.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <benefit.icon className="mb-4 h-6 w-6 text-emerald-600" />
              <CardTitle>{benefit.title}</CardTitle>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="validation" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/30 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Founding pilot</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">The goal is not more features. It is two successful pilots.</h2>
              <p className="mt-4 text-slate-700 dark:text-slate-300">
                ContaInbox is ready to demonstrate. We are looking for bookkeepers who want to test it with real clients and measure whether it reduces monthly follow-up.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/demo">Open interactive demo</ButtonLink>
                <ButtonLink href="#pricing" variant="secondary">View suggested pricing</ButtonLink>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {salesActions.map((action) => (
                <div key={action.title} className="rounded-2xl bg-white p-4 ring-1 ring-emerald-100 dark:bg-slate-950 dark:ring-emerald-900/60">
                  <action.icon className="mb-3 h-5 w-5 text-emerald-600" />
                  <p className="font-semibold">{action.title}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{action.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="border-y border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">Simple pricing</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Start with real clients. Add advanced automation only when it is needed.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {prices.map((plan) => (
              <Card key={plan.name}>
                <CardHeader>
                  <CardDescription>{plan.name}</CardDescription>
                  <CardTitle className="text-3xl">{plan.price}</CardTitle>
                </CardHeader>
                <p className="text-sm text-slate-600 dark:text-slate-300">{plan.detail}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/dashboard">Create an account</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
