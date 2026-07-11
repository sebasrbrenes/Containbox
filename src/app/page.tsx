import { ArrowRight, Bell, CheckCircle2, Download, FileUp, MessageSquareWarning, Send, ShieldCheck, TimerReset, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  { title: "Crea el cliente", description: "Registra nombre, email y periodo contable en menos de un minuto." },
  { title: "Envía un link", description: "El cliente sube documentos sin crear cuenta ni instalar nada." },
  { title: "Revisa qué falta", description: "Mira cada checklist como pendiente, recibido o revisado." },
  { title: "Descarga todo", description: "Baja los documentos del mes en un ZIP ordenado." },
];

const benefits = [
  { icon: MessageSquareWarning, title: "Menos persecución", description: "Deja de pedir facturas por WhatsApp todos los meses." },
  { icon: FileUp, title: "Carga simple", description: "Tus clientes reciben un link y suben archivos desde el celular." },
  { icon: Bell, title: "Recordatorios", description: "Envía emails de seguimiento a quienes aún deben documentos." },
  { icon: CheckCircle2, title: "Estado claro", description: "Pendiente, recibido y revisado para cada documento solicitado." },
  { icon: Download, title: "ZIP mensual", description: "Descarga todo por cliente y periodo para trabajar más rápido." },
  { icon: ShieldCheck, title: "Base segura", description: "Auth, base de datos y storage privado con Supabase." },
];

const prices = [
  { name: "Starter", price: "US$19/mes", detail: "Hasta 20 clientes" },
  { name: "Studio", price: "US$49/mes", detail: "Hasta 100 clientes" },
  { name: "Firm", price: "US$99/mes", detail: "Hasta 300 clientes" },
];

const salesActions = [
  { icon: TimerReset, title: "Demo en 3 minutos", description: "Muestra cliente, checklist, link público, pendientes y ZIP sin configurar Supabase." },
  { icon: Users, title: "Primeros 50 prospectos", description: "Contadores independientes y estudios pequeños que aún piden facturas por WhatsApp." },
  { icon: Send, title: "Oferta simple", description: "Prueba guiada + setup inicial. Objetivo: 2 usuarios piloto antes de construir más." },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="mb-4 inline-flex w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
            Para contadores y estudios contables pequeños
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Recibe documentos contables sin perseguir clientes por WhatsApp.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            ContaInbox crea checklists mensuales, links de carga y recordatorios para que tus clientes suban facturas, recibos y estados de cuenta a tiempo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/demo">
              Ver demo sin Supabase <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/dashboard" variant="secondary">Crear portal real</ButtonLink>
            <ButtonLink href="#como-funciona" variant="secondary">Ver cómo funciona</ButtonLink>
          </div>
        </div>
        <Card className="bg-slate-950 text-white dark:bg-white dark:text-slate-950">
          <CardHeader>
            <CardDescription className="text-slate-300 dark:text-slate-600">Flujo mensual</CardDescription>
            <CardTitle className="text-2xl">Del caos al checklist</CardTitle>
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

      <section id="como-funciona" className="border-y border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">Cómo funciona</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Un flujo simple para cerrar cada mes con menos mensajes repetidos.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <Card key={step.title}>
                <p className="mb-4 text-sm font-bold text-emerald-600">Paso {index + 1}</p>
                <CardTitle>{step.title}</CardTitle>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">Hecho para vender rápido y ahorrar tiempo real</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">MVP enfocado en el problema mensual: pedir, recibir y ordenar documentos.</p>
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

      <section id="validacion" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/30 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Plan de validación</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">La meta no es agregar más funciones: es conseguir 2 pilotos.</h2>
              <p className="mt-4 text-slate-700 dark:text-slate-300">
                ContaInbox ya se puede enseñar. El siguiente paso realista es mostrar la demo a contadores y confirmar si pagarían por ahorrar el caos mensual de documentos.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/demo">Abrir demo vendible</ButtonLink>
                <ButtonLink href="#precios" variant="secondary">Ver precios sugeridos</ButtonLink>
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

      <section id="precios" className="border-y border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">Precios simples</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Empieza con clientes reales y agrega OCR de facturas después.</p>
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
            <ButtonLink href="/dashboard">Crear cuenta y probar</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
