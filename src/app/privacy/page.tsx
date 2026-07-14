import { Card, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight">Privacy notice</h1>
      <p className="mt-3 text-sm text-slate-500">Effective July 14, 2026 · Pilot version</p>
      <Card className="mt-8 space-y-6 text-sm leading-7 text-slate-700 dark:text-slate-300">
        <section>
          <CardTitle>Information we process</CardTitle>
          <p className="mt-2">FileFollowup processes account details, bookkeeping-firm client contact details, document-request checklists, uploaded files, uploader names, and basic operational events needed to provide the service.</p>
        </section>
        <section>
          <CardTitle>How information is used</CardTitle>
          <p className="mt-2">We use this information to authenticate firm users, deliver document requests, store and return uploaded documents, send requested reminders, provide support, maintain security, and improve reliability. We do not sell personal information.</p>
        </section>
        <section>
          <CardTitle>Service providers</CardTitle>
          <p className="mt-2">The pilot may use Supabase for authentication, database, and file storage; Vercel for hosting; Resend for transactional email; and configured analytics or error-monitoring providers. These providers process information on our behalf to operate the service.</p>
        </section>
        <section>
          <CardTitle>Retention and deletion</CardTitle>
          <p className="mt-2">Pilot data is retained only while needed to provide the pilot, resolve operational issues, and meet applicable obligations. Firm users may request an export or deletion through their established FileFollowup support channel. Deletion requests will include database records and associated stored files, subject to any required legal retention.</p>
        </section>
        <section>
          <CardTitle>Security and pilot limitations</CardTitle>
          <p className="mt-2">We use authenticated firm access, private file storage, and tokenized client upload links. No system can guarantee absolute security. FileFollowup does not currently claim SOC 2, HIPAA, or another independent security certification.</p>
        </section>
        <section>
          <CardTitle>Your choices</CardTitle>
          <p className="mt-2">Contact the bookkeeping firm that sent your upload link to correct client information or withdraw a request. Firm account holders can use their established support channel for access, correction, export, or deletion requests.</p>
        </section>
      </Card>
    </main>
  );
}
