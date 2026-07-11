# Micro SaaS Template

Template web para lanzar micro SaaS con:

- Next.js App Router + TypeScript
- Tailwind CSS + componentes estilo shadcn/ui
- Supabase PostgreSQL + Supabase Auth
- Landing responsive
- Login/register
- Dashboard protegido
- Onvo para pagos
- Resend para emails
- PostHog o Plausible para analytics
- Sentry para error tracking
- Deploy en Vercel

## Inicio rápido

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`.

## Variables de entorno

Copia `.env.example` a `.env.local` y completa lo necesario:

- `NEXT_PUBLIC_APP_URL`: URL base de la app.
- `NEXT_PUBLIC_SUPABASE_URL`: URL del proyecto Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon key de Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: service role para tareas backend/admin.
- `ONVO_API_KEY`: API key de Onvo.
- `ONVO_WEBHOOK_SECRET`: secreto de webhooks Onvo.
- `ONVO_PRICE_ID`: price/plan id para checkout.
- `RESEND_API_KEY`: API key de Resend.
- `RESEND_FROM_EMAIL`: remitente verificado.
- `NEXT_PUBLIC_POSTHOG_KEY`: project key de PostHog.
- `NEXT_PUBLIC_POSTHOG_HOST`: host PostHog.
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`: dominio Plausible si prefieres Plausible.
- `NEXT_PUBLIC_SENTRY_DSN`: DSN de Sentry.

## Rutas incluidas

- `/`: landing responsive.
- `/login`: login/register con Supabase Auth.
- `/auth/callback`: callback OAuth/email de Supabase.
- `/dashboard`: dashboard privado o estado de setup si faltan credenciales.
- `/api/onvo/checkout`: crea checkout Onvo.
- `/api/onvo/webhook`: endpoint base para webhooks Onvo.
- `/api/email/welcome`: envía email de bienvenida con Resend.

## Base de datos

Ejecuta `supabase/schema.sql` en Supabase SQL editor. Incluye:

- `profiles`
- `subscriptions`
- `events`
- RLS básico
- trigger para crear profile al registrar usuario

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Deploy

Ver `docs/deploy.md`.

## Notas de integración

- Onvo: el cliente usa `https://api.onvo.co/v1/checkout/sessions`. Ajusta payload si tu cuenta/SDK usa otro contrato.
- Webhooks Onvo: reemplaza el TODO con la verificación oficial de firma antes de producción.
- Analytics: si configuras PostHog y Plausible a la vez, ambos cargan; normalmente usa solo uno.
