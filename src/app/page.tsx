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
      <section className="relative mx-auto grid max-w-7xl gap-12 overflow-hidden px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="vintage-kicker mb-6">
            For independent bookkeepers and small accounting firms
          </p>
          <h1 className="max-w-4xl text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl">
            Collect client documents without the monthly chase.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            FileFollowup gives you monthly checklists, no-login upload links, and reminders so clients can send statements, receipts, and reports on time.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/demo">
              View interactive demo <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/dashboard" variant="secondary">Create your workspace</ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary">See how it works</ButtonLink>
          </div>
        </div>
        <Card className="ledger-lines relative overflow-hidden border-slate-300 bg-[#eee5d5] p-8 shadow-[8px_8px_0_rgba(89,67,49,0.10)]">
          <span className="postmark absolute top-6 right-6">Monthly<br />close</span>
          <CardHeader className="max-w-[75%]">
            <CardDescription className="vintage-kicker text-emerald-700">Monthly workflow</CardDescription>
            <CardTitle className="mt-3 text-3xl leading-tight">From scattered files to one orderly checklist</CardTitle>
          </CardHeader>
          <div className="grid text-sm">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-start gap-4 border-b border-slate-300/80 py-4 last:border-0">
                <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-700 text-lg font-semibold text-emerald-800">{index + 1}</span>
                <div>
                  <p className="font-semibold">{step.title}</p>
                  <p className="mt-1 text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section id="how-it-works" className="border-y border-slate-300 bg-slate-50/75 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="vintage-kicker mb-4">The process</p>
            <h2 className="hairline-title text-4xl font-semibold tracking-tight">How it works</h2>
            <p className="mt-3 text-slate-600">A simple workflow for closing each month with fewer follow-up messages.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <Card key={step.title}>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">Step {index + 1}</p>
                <CardTitle>{step.title}</CardTitle>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="vintage-kicker mb-4">Made for the close</p>
          <h2 className="text-4xl font-semibold tracking-tight">Built to save time on the monthly close</h2>
          <p className="mt-3 text-slate-600">A focused workflow for requesting, receiving, and organizing client documents.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50">
                <benefit.icon className="h-5 w-5 text-emerald-700" />
              </span>
              <CardTitle>{benefit.title}</CardTitle>
              <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="validation" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="vintage-kicker">Founding pilot</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight">The goal is not more features. It is two successful pilots.</h2>
              <p className="mt-4 text-slate-700">
                FileFollowup is ready to demonstrate. We are looking for bookkeepers who want to test it with real clients and measure whether it reduces monthly follow-up.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/demo">Open interactive demo</ButtonLink>
                <ButtonLink href="#pricing" variant="secondary">View suggested pricing</ButtonLink>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {salesActions.map((action) => (
                <div key={action.title} className="rounded-2xl bg-white p-4 ring-1 ring-emerald-200">
                  <action.icon className="mb-3 h-5 w-5 text-emerald-600" />
                  <p className="font-semibold">{action.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{action.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="border-y border-slate-300 bg-slate-50/75 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="vintage-kicker mb-4">Plain and fair</p>
            <h2 className="text-4xl font-semibold tracking-tight">Simple pricing</h2>
            <p className="mt-3 text-slate-600">Start with real clients. Add advanced automation only when it is needed.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {prices.map((plan) => (
              <Card key={plan.name}>
                <CardHeader>
                  <CardDescription>{plan.name}</CardDescription>
                  <CardTitle className="text-3xl">{plan.price}</CardTitle>
                </CardHeader>
                <p className="text-sm text-slate-600">{plan.detail}</p>
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
