# ContaInbox — reporte de avance

Fecha: 2026-06-25

## Hecho

- Creado workspace desde template en `/home/sebas/Documents/conta-inbox`.
- Rebrand completo de landing/header/footer a **ContaInbox**.
- Agregado schema Supabase para:
  - `accounting_clients`
  - `document_requests`
  - `document_request_items`
  - `uploaded_documents`
  - bucket privado `client-documents`
- Implementado dashboard con métricas base.
- Implementado clientes:
  - lista
  - creación
  - detalle
- Implementado solicitudes:
  - creación por cliente
  - checklist por periodo
  - detalle
  - link público de carga
  - marcar item revisado
  - marcar solicitud completada
- Implementado upload público sin login:
  - `/upload/[token]`
  - `POST /api/public-upload/[token]`
  - guarda archivo en Supabase Storage
  - registra metadata en DB
  - marca item como recibido
- Implementada descarga individual de documentos:
  - `/api/documents/[id]/download`
- Implementada descarga ZIP por solicitud:
  - `/api/requests/[id]/download`
- Implementado recordatorio por email:
  - `/api/requests/[id]/reminder`
  - usa Resend

## Verificación

Comandos ejecutados:

```bash
npm run lint
npm run build
```

Resultado:

```txt
✓ Compiled successfully
✓ Finished TypeScript
✓ Generating static pages
```

Build OK.

## Pendiente próximo

1. Configurar Supabase real y ejecutar `supabase/schema.sql`.
2. Configurar variables `.env.local`:
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
3. Probar flujo real end-to-end con una cuenta.
4. Deploy en Vercel.
5. Configurar Onvo para cobrar.
6. Contactar primeros contadores.

## Avance 2026-07-05

- Agregada sección de validación en landing: objetivo explícito de conseguir 2 pilotos antes de construir más.
- Agregado link de navegación `Validación` en header.
- Creados materiales comerciales en `sales/`:
  - `DEMO_SCRIPT.md`
  - `OUTREACH_MESSAGES.md`
  - `VALIDATION_PLAN.md`
  - `OBJECTIONS.md`
  - `PROSPECT_TRACKER.csv`

## Próximo paso recomendado

Usar `/demo` + `sales/DEMO_SCRIPT.md` para mostrar ContaInbox a 5 contadores. No construir features grandes hasta validar interés real.

## Avance 2026-07-05 — Supabase conectado

- `.env.local` configurado por Sebastián con Supabase real.
- Verificado bucket privado `client-documents`.
- Creado usuario de prueba confirmado vía Supabase Admin.
- Verificado login real en `/login`.
- Creado cliente real desde dashboard.
- Creada solicitud mensual real.
- Verificado link público `/upload/[token]`.
- Subido archivo de prueba a Supabase Storage mediante `POST /api/public-upload/[token]`.
- Confirmado registro en `uploaded_documents` y visualización en dashboard.
- Agregado mensaje de éxito en el portal público después de subir archivo.
- Verificación final: `npm run lint && npm run build` OK.

## Ruta local

```txt
/home/sebas/Documents/conta-inbox
```
