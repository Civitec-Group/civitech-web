# Contributing · civitech-web

## Flujo Git

- **Rama base**: `main`. Sin push directo — PR obligatorio.
- **Nombres de rama**:
  - `feature/<slug>` funcionalidad nueva
  - `fix/<slug>` bug
  - `chore/<slug>` infra/docs/deps
  - `content/<slug>` cambios de copy/textos
- **Commits conventional**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `content:`, `seo:`, `web:`
- **PR contra `main`** con la plantilla rellenada
- **Merge**: squash · borrar rama

## Antes de abrir PR

```bash
npm run build     # verifica que compila sin errores TS
```

- Sin errores TypeScript
- Sin `console.log` de debug
- Sin secretos en el diff
- Si añades imágenes: comprimidas (< 200 KB); usa WebP para fotos
- Si tocas el chatbot: probar en local con `.env` real (pedir a Xim el link n8n dev)

## Qué NO va aquí

- `.env` real (gitignoreado)
- `environment.ts` (se genera con `node set-env.js`)
- Fotos originales pesadas antes de comprimir (`gbp-domotica/originales/` está ignorado)
- Datos de clientes reales en `casos/`

## Convenciones Angular

- Standalone components (Angular 16+)
- Lazy load por feature route
- Estilos: SCSS por component, evitar `!important`
- i18n si aplica: `i18n` attribute + `xliff`
- SEO: cada ruta define `<title>` + meta description (ver `SEO-AUDIT.md`)

## Cuándo preguntar a Xim

- Cambios en el schema.org / structured data
- Cambios en el chatbot (proxy n8n)
- Cambios en el precio o info de servicios en `home`
- Cambios en marca / logo / colores (Civitec Domótica, memoria durable)

## Qué NO hace falta preguntar

- Componentes nuevos que encajan en el diseño existente
- Correcciones de typo, meta descriptions
- Nuevos casos de éxito en `casos/`
- Mejoras de accesibilidad
- Fixes de responsive
