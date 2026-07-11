# Deploy en Vercel

1. Crea un repositorio en GitHub y sube este template.
2. Crea un proyecto en Supabase y ejecuta `supabase/schema.sql` en el SQL editor.
3. Configura Auth en Supabase:
   - Site URL: `https://tu-dominio.com`
   - Redirect URL: `https://tu-dominio.com/auth/callback`
4. Crea cuenta/proyecto en Onvo y define `ONVO_API_KEY`, `ONVO_PRICE_ID`, `ONVO_WEBHOOK_SECRET`.
5. Crea API key en Resend y verifica tu dominio de envío.
6. Opcional: crea proyecto en PostHog o configura `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
7. Opcional: crea proyecto en Sentry y configura `NEXT_PUBLIC_SENTRY_DSN`.
8. Importa el repo en Vercel.
9. Copia las variables de `.env.example` en Vercel Project Settings > Environment Variables.
10. Deploy.

## Verificación post-deploy

- `/` carga landing.
- `/login` permite registro/login.
- `/dashboard` exige usuario autenticado.
- `/api/onvo/checkout` crea checkout o muestra error claro si falta configuración.
- `POST /api/email/welcome` envía email si Resend está configurado.
