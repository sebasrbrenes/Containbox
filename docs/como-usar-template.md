# Cómo funciona este template y cómo reutilizarlo

Este proyecto es una plantilla base para crear micro SaaS web rápidamente.

Ruta del proyecto:

```txt
/home/sebas/Documents/micro-saas-template
```

Incluye:

- Landing pública
- Login / registro
- Dashboard privado
- Base de datos con Supabase
- Pagos con Onvo
- Emails con Resend
- Analytics con PostHog o Plausible
- Error tracking con Sentry
- Deploy en Vercel

---

## 1. Estructura general

El proyecto usa Next.js App Router.

Rutas principales:

```txt
/
```

Landing pública del producto.

```txt
/login
```

Pantalla de login y registro usando Supabase Auth.

```txt
/dashboard
```

Dashboard privado. Si Supabase no está configurado, muestra un mensaje de setup.

```txt
/docs/deploy
```

Página interna simple con pasos de deploy.

```txt
/api/onvo/checkout
```

Endpoint para crear checkout con Onvo.

```txt
/api/onvo/webhook
```

Endpoint base para recibir webhooks de Onvo.

```txt
/api/email/welcome
```

Endpoint para mandar email de bienvenida usando Resend.

```txt
/auth/callback
```

Callback de Supabase Auth.

---

## 2. Cómo funciona cada parte

### Landing

Archivo principal:

```txt
src/app/page.tsx
```

Aquí está la página pública con:

- Hero
- CTA
- Features
- Stack
- Link al dashboard
- Link al login

Esto es lo primero que deberías personalizar para cada nuevo SaaS.

---

### Layout global

Archivo:

```txt
src/app/layout.tsx
```

Carga:

- Navbar
- Footer
- Analytics
- Fuentes
- Estilos globales

Componentes relacionados:

```txt
src/components/site-header.tsx
src/components/site-footer.tsx
src/components/analytics.tsx
```

Aquí puedes cambiar nombre del producto, navegación, links, metadata SEO y estructura general.

---

### Login / Registro

Archivos:

```txt
src/app/login/page.tsx
src/app/login/login-form.tsx
src/lib/supabase/client.ts
src/lib/supabase/server.ts
src/app/auth/callback/route.ts
```

Funciona con Supabase Auth.

Variables necesarias:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Si están configuradas, el login/registro funciona con Supabase.

Si no están configuradas, la app no rompe: muestra un mensaje avisando que falta configurar Supabase.

---

### Dashboard

Archivo:

```txt
src/app/dashboard/page.tsx
```

Funciona así:

1. Si Supabase no está configurado, muestra pantalla de setup.
2. Si Supabase está configurado pero el usuario no está logueado, redirige a `/login`.
3. Si hay usuario autenticado, muestra el dashboard.

Ahora mismo tiene métricas placeholder:

- MRR
- Usuarios
- Eventos

Para cada SaaS nuevo, aquí deberías poner las métricas y acciones reales del producto.

---

### Base de datos

Archivo:

```txt
supabase/schema.sql
```

Incluye tablas base:

```txt
profiles
subscriptions
events
```

También incluye:

- RLS básico
- Trigger para crear perfil cuando se registra un usuario

Para usarlo:

1. Crear proyecto en Supabase.
2. Ir al SQL Editor.
3. Ejecutar el contenido de `supabase/schema.sql`.

Para cada micro SaaS nuevo, normalmente debes agregar tus propias tablas.

Ejemplos:

SaaS de facturación:

```txt
invoices
clients
payments
```

SaaS de reservas:

```txt
bookings
customers
services
```

SaaS de generación de contenido:

```txt
projects
documents
generations
credits
```

Ejemplo de tabla propia:

```sql
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);
```

Recuerda agregar políticas RLS para cada tabla nueva.

---

### Pagos con Onvo

Archivos:

```txt
src/lib/onvo.ts
src/app/api/onvo/checkout/route.ts
src/app/api/onvo/webhook/route.ts
```

Variables necesarias:

```env
ONVO_API_KEY=
ONVO_WEBHOOK_SECRET=
ONVO_PRICE_ID=
```

Flujo esperado:

1. Usuario hace clic en checkout.
2. La app llama a `/api/onvo/checkout`.
3. Ese endpoint llama a Onvo.
4. Onvo devuelve una URL de checkout.
5. Usuario paga.
6. Onvo manda un evento a `/api/onvo/webhook`.
7. El webhook debería actualizar la suscripción del usuario en Supabase.

Importante:

El webhook está como base. Antes de producción debes completar la verificación real de firma según la documentación oficial de Onvo.

Cada vez que uses la plantilla para otro SaaS, cambia:

- `ONVO_PRICE_ID`
- Planes/precios
- Payload de checkout si Onvo requiere campos específicos
- Lógica del webhook
- Qué pasa después de pagar
- Qué permisos obtiene el usuario al pagar
- Cómo se actualiza la tabla `subscriptions`

---

### Emails con Resend

Archivos:

```txt
src/lib/email.ts
src/app/api/email/welcome/route.ts
```

Variables necesarias:

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```

Ahora tiene un email simple de bienvenida.

Para cada SaaS deberías personalizar:

- Remitente
- HTML del email
- Nombre del producto
- Emails transaccionales necesarios

Ejemplos típicos:

- Bienvenida
- Confirmación de pago
- Aviso de límite alcanzado
- Factura
- Cancelación
- Invitación a equipo

---

### Analytics

Archivo:

```txt
src/components/analytics.tsx
```

Soporta PostHog y Plausible.

Variables:

```env
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

Para cada nuevo SaaS deberías cambiar:

- Project key de PostHog
- Dominio de Plausible
- Eventos personalizados

Eventos recomendados:

```txt
signup_completed
checkout_started
checkout_completed
dashboard_viewed
feature_used
subscription_cancelled
```

---

### Sentry

Archivos:

```txt
sentry.client.config.ts
sentry.server.config.ts
```

Variable:

```env
NEXT_PUBLIC_SENTRY_DSN=
```

Sirve para capturar errores del frontend/backend.

Para cada SaaS nuevo:

- Crear nuevo proyecto en Sentry
- Cambiar DSN
- Opcionalmente configurar environments:
  - development
  - preview
  - production

---

## 3. Qué modificar cada vez que uses la plantilla

### A. Identidad del producto

Archivos principales:

```txt
src/app/page.tsx
src/components/site-header.tsx
src/components/site-footer.tsx
src/app/layout.tsx
README.md
```

Modificar:

- Nombre del SaaS
- Descripción
- Propuesta de valor
- CTA
- Features
- Metadata SEO
- Textos de landing
- Footer
- Links

---

### B. Variables de entorno

Copiar:

```bash
cp .env.example .env.local
```

Y completar:

```env
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

ONVO_API_KEY=
ONVO_WEBHOOK_SECRET=
ONVO_PRICE_ID=

RESEND_API_KEY=
RESEND_FROM_EMAIL=

NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=

NEXT_PUBLIC_SENTRY_DSN=
```

Para cada SaaS nuevo, casi todas estas variables cambian.

---

### C. Base de datos

Modificar:

```txt
supabase/schema.sql
```

Normalmente mantienes:

- `profiles`
- `subscriptions`
- `events`

Y agregas tablas propias del producto.

También debes agregar políticas RLS para proteger los datos por usuario.

---

### D. Dashboard

Modificar:

```txt
src/app/dashboard/page.tsx
```

Cambiar:

- Métricas placeholder
- Cards
- Menús
- Datos reales desde Supabase
- Acciones principales del producto

Ejemplo:

Para un SaaS de documentos, el dashboard debería mostrar:

- Documentos creados
- Créditos usados
- Últimas generaciones
- Botón “Crear documento”

---

### E. Onvo / pagos

Modificar:

```txt
src/lib/onvo.ts
src/app/api/onvo/checkout/route.ts
src/app/api/onvo/webhook/route.ts
```

Cambiar:

- Price ID
- Payload de checkout
- Usuario que está pagando
- Verificación de webhook
- Actualización de tabla `subscriptions`
- Límites/permisos después del pago

Lo más importante es conectar el pago con tu usuario Supabase.

---

### F. Emails

Modificar:

```txt
src/lib/email.ts
src/app/api/email/welcome/route.ts
```

Cambiar:

- Subject
- HTML
- Marca
- Dominio remitente
- Emails específicos del producto

---

### G. Analytics

Modificar o extender:

```txt
src/components/analytics.tsx
```

Y en cualquier archivo donde quieras trackear eventos del producto.

Ejemplo:

```ts
posthog.capture("checkout_started");
```

---

### H. Deploy

Modificar:

```txt
docs/deploy.md
docs/checklist.md
```

Y configurar en Vercel:

- Variables de entorno
- Dominio
- Supabase redirect URLs
- Webhook de Onvo
- DNS de Resend

---

## 4. Cómo usarlo para crear un nuevo micro SaaS

Puedes copiar la plantilla así:

```bash
cp -R /home/sebas/Documents/micro-saas-template /home/sebas/Documents/mi-nuevo-saas
cd /home/sebas/Documents/mi-nuevo-saas
rm -rf .next
npm install
cp .env.example .env.local
npm run dev
```

Luego:

1. Cambiar nombre/textos de landing.
2. Crear proyecto Supabase.
3. Ejecutar `supabase/schema.sql`.
4. Agregar tablas propias.
5. Configurar Supabase Auth.
6. Configurar Onvo.
7. Configurar Resend.
8. Configurar analytics.
9. Configurar Sentry.
10. Probar `npm run build`.
11. Subir a GitHub.
12. Deploy en Vercel.

---

## 5. Qué NO está completo todavía para producción

El template está listo como base, pero para producción real faltaría completar:

- Verificación oficial del webhook de Onvo.
- Asociar checkout con usuario autenticado real.
- Actualizar tabla `subscriptions` cuando Onvo confirme pago.
- Middleware más robusto para proteger rutas privadas.
- Panel real del producto.
- Tests automatizados.
- Manejo de planes, límites y permisos.
- Branding completo.
- SEO avanzado.
- Legal pages:
  - Terms
  - Privacy Policy
  - Refund Policy
- Emails reales con diseño final.
- Dominio y DNS.

---

## 6. Resumen mental

Este template es el esqueleto SaaS.

Ya viene preparado con:

```txt
auth
base visual
variables de entorno
pagos
emails
analytics
deploy
estructura de carpetas
documentación
```

Cada nuevo micro SaaS debería enfocarse en:

```txt
1. Idea / nicho
2. Landing específica
3. Modelo de datos propio
4. Dashboard propio
5. Lógica principal del producto
6. Planes/precios
7. Emails y eventos específicos
```

En resumen: la plantilla evita repetir el setup técnico. Para cada nuevo proyecto cambias el producto, la base de datos, el dashboard y la lógica de negocio.
