import { Card, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight">Pilot terms</h1>
      <p className="mt-3 text-sm text-slate-500">Effective July 14, 2026 · Pilot version</p>
      <Card className="mt-8 space-y-6 text-sm leading-7 text-slate-700 dark:text-slate-300">
        <section>
          <CardTitle>Service</CardTitle>
          <p className="mt-2">ContaInbox is a pilot document-request and collection service for bookkeeping firms. It is not bookkeeping, accounting, tax, legal, or financial advice and does not prepare or verify the contents of uploaded documents.</p>
        </section>
        <section>
          <CardTitle>Authorized use</CardTitle>
          <p className="mt-2">Firm users must have authority to enter client contact details, request documents, and process uploaded files. Upload-link recipients may use a link only for the request and firm that provided it. Users must not upload malicious, illegal, or unrelated content or attempt to bypass access controls.</p>
        </section>
        <section>
          <CardTitle>Pilot availability</CardTitle>
          <p className="mt-2">Pilot functionality may change, experience interruptions, or require direct support. Important records should not rely on ContaInbox as their only copy. Any pilot fee, term, support commitment, or refund condition is governed by the written offer accepted by the participating firm.</p>
        </section>
        <section>
          <CardTitle>Customer responsibilities</CardTitle>
          <p className="mt-2">Firm users are responsible for account security, the accuracy of requests, their client communications, lawful data handling, and downloading or retaining records needed for their professional obligations.</p>
        </section>
        <section>
          <CardTitle>Suspension and termination</CardTitle>
          <p className="mt-2">Access may be suspended to address security, misuse, legal, or operational risks. A participating firm may end its pilot under its written offer and request export or deletion through its established support channel.</p>
        </section>
        <section>
          <CardTitle>Review before public launch</CardTitle>
          <p className="mt-2">These concise terms support a limited pilot and are not a substitute for jurisdiction-specific legal review. Public self-service sales require finalized operator identity, contact information, governing law, payment terms, warranty disclaimers, and liability provisions.</p>
        </section>
      </Card>
    </main>
  );
}
