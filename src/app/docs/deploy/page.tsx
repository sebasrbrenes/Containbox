import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  "Sube el proyecto a GitHub.",
  "Crea proyecto Supabase y ejecuta supabase/schema.sql.",
  "Configura Supabase Auth con /auth/callback.",
  "Agrega credenciales de Onvo, Resend, analytics y Sentry.",
  "Importa el repo en Vercel y copia las variables de entorno.",
  "Ejecuta el primer deploy y prueba login, dashboard, checkout y emails.",
];

export default function DeployDocsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">Docs</p>
        <h1 className="text-4xl font-bold tracking-tight">Deploy en Vercel</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Guía rápida para pasar el template de local a producción.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pasos</CardTitle>
        </CardHeader>
        <ol className="space-y-3 pl-5 text-slate-700 dark:text-slate-300">
          {steps.map((step) => (
            <li className="list-decimal" key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-slate-500">
          La versión completa está en docs/deploy.md dentro del repositorio.
        </p>
      </Card>
    </main>
  );
}
