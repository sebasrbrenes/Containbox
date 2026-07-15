import { ArrowRight, Check, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

const requestRows = [
  { item: "Bank statements", note: "Operating + savings", status: "Reviewed", tone: "reviewed" },
  { item: "Sales invoices", note: "June 01–30", status: "Received", tone: "received" },
  { item: "Payroll report", note: "Final payroll run", status: "Waiting", tone: "waiting" },
  { item: "Expense receipts", note: "Card ending 1842", status: "Waiting", tone: "waiting" },
];

const workflow = [
  ["01", "Write the list once", "Choose exactly what this client owes for the period: statements, invoices, payroll reports, or anything else."],
  ["02", "Send one plain link", "Your client opens it on any device. No account, password, app, or new portal to learn."],
  ["03", "Work from the exceptions", "See what arrived and follow up only on what is still missing. No more rebuilding the story from an email thread."],
  ["04", "Take the clean handoff", "Review the files, close the checklist, and download the period as one organized ZIP."],
];

const plans = [
  { name: "Starter", price: "$19", clients: "20 clients", fit: "For a solo bookkeeper" },
  { name: "Studio", price: "$49", clients: "100 clients", fit: "For a growing practice" },
  { name: "Firm", price: "$99", clients: "300 clients", fit: "For a small team" },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-[1180px] px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mb-8 flex items-center justify-between border-b border-slate-400 pb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-600">
          <span>Document collection for bookkeepers</span>
          <span className="hidden sm:inline">One link · One list · One clean close</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <p className="mb-6 max-w-sm text-sm leading-6 text-slate-600">
              FileFollowup replaces the monthly scavenger hunt with a small, dependable checklist your clients can actually use.
            </p>
            <h1 className="max-w-3xl text-[3.7rem] leading-[0.9] font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[5.6rem]">
              The month is over.<br />The chase should be, too.
            </h1>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/demo">
                Try the working demo <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/dashboard" variant="secondary">Start a workspace</ButtonLink>
            </div>
            <p className="mt-4 text-xs text-slate-500">Built for independent bookkeepers and small accounting firms.</p>
          </div>

          <div className="product-sheet" aria-label="Example monthly document checklist">
            <div className="flex items-start justify-between gap-6 border-b border-slate-400 px-5 py-5 sm:px-7">
              <div>
                <p className="sheet-label">Client file / 024</p>
                <h2 className="mt-2 text-3xl font-semibold">Oak &amp; Main Bakery</h2>
                <p className="mt-1 text-sm text-slate-600">June 2026 close</p>
              </div>
              <div className="text-right">
                <p className="sheet-label">Progress</p>
                <p className="mt-2 font-display text-3xl font-semibold">2 / 4</p>
              </div>
            </div>
            <div>
              {requestRows.map((row, index) => (
                <div key={row.item} className="grid grid-cols-[1.8rem_1fr_auto] items-center gap-3 border-b border-slate-300 px-5 py-4 last:border-0 sm:px-7">
                  <span className="font-mono text-[0.68rem] text-slate-500">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-sm font-semibold">{row.item}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{row.note}</p>
                  </div>
                  <span className={`request-status ${row.tone}`}><i />{row.status}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-slate-400 px-5 py-4 text-xs text-slate-600 sm:px-7">
              <span>Last activity: today, 9:42 AM</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-800"><Mail className="h-3.5 w-3.5" /> Send reminder</span>
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="border-y border-slate-400 bg-[#2f2924] text-[#f4efe4]">
        <div className="mx-auto grid max-w-[1180px] lg:grid-cols-[0.32fr_0.68fr]">
          <div className="border-b border-[#766b61] px-4 py-9 sm:px-6 lg:border-b-0 lg:border-r lg:px-8 lg:py-16">
            <p className="sheet-label text-[#d8ad97]">The point</p>
            <p className="mt-5 max-w-xs text-sm leading-6 text-[#cfc2ad]">Your accounting software starts after the documents arrive. FileFollowup handles the awkward part before that.</p>
          </div>
          <div className="px-4 py-10 sm:px-6 lg:px-12 lg:py-16">
            <p className="max-w-4xl font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              “Can you send that statement again?” is not a workflow.
            </p>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#cfc2ad]">
              Email is good at conversation and bad at keeping a monthly close in order. FileFollowup gives every request a visible state, so both sides know what is done and what is holding up the books.
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <p className="sheet-label text-emerald-800">A boring process, on purpose</p>
            <h2 className="mt-5 text-4xl leading-tight font-semibold sm:text-5xl">Four steps. Nothing to configure.</h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">
              We kept the workflow short because the software should disappear once the files are in your hands.
            </p>
          </div>
          <ol className="border-t border-slate-400">
            {workflow.map(([number, title, description]) => (
              <li key={number} className="grid gap-4 border-b border-slate-400 py-7 sm:grid-cols-[3rem_0.7fr_1.3fr] sm:gap-6">
                <span className="font-mono text-xs text-emerald-800">{number}</span>
                <h3 className="text-2xl leading-tight font-semibold">{title}</h3>
                <p className="text-sm leading-6 text-slate-600">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="product" className="border-y border-slate-400 bg-[#eee5d5]">
        <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_0.3fr] lg:items-start">
            <div className="overflow-hidden border border-slate-500 bg-[#fbf8f0] shadow-[10px_10px_0_#cfc2ad]">
              <div className="flex items-center justify-between border-b border-slate-400 px-5 py-3">
                <div className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-emerald-700" /><span className="font-mono text-[0.68rem] uppercase tracking-wider">Live request</span></div>
                <span className="text-xs text-slate-500">filefollowup / oak-main / june-2026</span>
              </div>
              <div className="grid md:grid-cols-[1fr_15rem]">
                <div className="p-6 sm:p-8">
                  <p className="sheet-label">Files requested by Birch Street Books</p>
                  <h3 className="mt-4 text-4xl font-semibold">Good afternoon, Maya.</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">Please upload the four items below for Oak &amp; Main Bakery’s June books. You can come back to this link at any time.</p>
                  <div className="mt-8 border-t border-slate-300">
                    {requestRows.slice(0, 3).map((row, index) => (
                      <div key={row.item} className="flex items-center justify-between gap-4 border-b border-slate-300 py-4">
                        <span className="text-sm"><b className="mr-3 font-mono text-xs text-slate-400">{index + 1}</b>{row.item}</span>
                        <span className="text-xs font-semibold text-emerald-800">{index === 2 ? "Choose file" : "Uploaded"}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <aside className="border-t border-slate-400 bg-slate-50 p-6 md:border-l md:border-t-0">
                  <p className="sheet-label">What the client sees</p>
                  <ul className="mt-5 space-y-4 text-sm leading-5 text-slate-700">
                    <li className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" />No signup or password</li>
                    <li className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" />A list written in your words</li>
                    <li className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" />Clear proof that a file arrived</li>
                  </ul>
                </aside>
              </div>
            </div>
            <div className="lg:pl-5">
              <p className="sheet-label text-emerald-800">Show, don’t promise</p>
              <h2 className="mt-5 text-4xl leading-tight font-semibold">A client portal that feels like a request, not another system.</h2>
              <p className="mt-5 text-sm leading-6 text-slate-600">The upload page says who is asking, what they need, and what has already arrived. That is the whole job.</p>
              <ButtonLink href="/demo" variant="secondary" className="mt-7">Use the interactive demo</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <p className="sheet-label text-emerald-800">Pricing draft</p>
            <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">Pay for the size of your client book.</h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">Every plan includes unlimited requests, upload links, reminders, and ZIP downloads. We are validating these prices with our first firms.</p>
          </div>
          <div className="border-t border-slate-500">
            {plans.map((plan) => (
              <div key={plan.name} className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-500 py-6 sm:grid-cols-[0.7fr_0.8fr_0.8fr_auto] sm:items-center">
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <p className="hidden text-sm text-slate-600 sm:block">{plan.fit}</p>
                <p className="text-sm font-semibold text-slate-700">{plan.clients}</p>
                <p className="text-right"><span className="font-display text-3xl font-semibold">{plan.price}</span><span className="text-xs text-slate-500"> / month</span></p>
              </div>
            ))}
            <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm leading-6 text-slate-600">Founding pilot: guided setup, real-client testing, and direct feedback with the builder.</p>
              <ButtonLink href="/dashboard">Start with a real client</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-400 bg-emerald-900 text-[#f4efe4]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-4 py-14 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
          <div>
            <p className="sheet-label text-[#d8ad97]">Ready when the next month closes</p>
            <h2 className="mt-5 max-w-3xl text-4xl leading-tight font-semibold sm:text-5xl">Try the whole workflow before asking a client to use it.</h2>
          </div>
          <ButtonLink href="/demo" variant="secondary" className="shrink-0 border-[#d8ad97] bg-transparent text-[#f4efe4] hover:bg-[#f4efe4] hover:text-[#2f2924]">
            Open the demo <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
