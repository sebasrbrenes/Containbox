import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  "Push the project to GitHub.",
  "Create a Supabase project and run supabase/schema.sql.",
  "Configure Supabase Auth with /auth/callback.",
  "Add credentials for Onvo, Resend, analytics, and Sentry.",
  "Import the repository into Vercel and copy the environment variables.",
  "Run the first deployment and test login, dashboard, checkout, and email.",
];

export default function DeployDocsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">Docs</p>
        <h1 className="text-4xl font-bold tracking-tight">Deploy to Vercel</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          A quick guide to moving the application from local development to production.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Steps</CardTitle>
        </CardHeader>
        <ol className="space-y-3 pl-5 text-slate-700 dark:text-slate-300">
          {steps.map((step) => (
            <li className="list-decimal" key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-slate-500">
          The full version is available in docs/deploy.md in the repository.
        </p>
      </Card>
    </main>
  );
}
