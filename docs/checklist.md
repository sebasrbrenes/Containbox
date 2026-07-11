# Checklist de lanzamiento

## Producto
- [ ] Definir ICP y propuesta de valor.
- [ ] Ajustar copy de landing.
- [ ] Crear pricing real.

## Técnico
- [ ] Copiar `.env.example` a `.env.local`.
- [ ] Ejecutar `supabase/schema.sql`.
- [ ] Configurar Supabase Auth redirect URLs.
- [ ] Configurar Onvo checkout y webhook.
- [ ] Verificar dominio Resend.
- [ ] Activar PostHog/Plausible.
- [ ] Activar Sentry.

## Deploy
- [ ] Crear repo GitHub.
- [ ] Importar en Vercel.
- [ ] Agregar env vars.
- [ ] Ejecutar `npm run build`.
- [ ] Probar flujo completo en producción.
