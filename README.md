# civitech-web

Landing y web pública de Civitec Domótica (`civitech.es`). Angular 16 SSR + PrimeNG + Bootstrap.

## Quick start (~5 min primera vez)

```bash
git clone git@github.com:Civitec-Group/civitech-web.git
cd civitech-web
cp .env.example .env    # opcional; sin él arranca en modo estático sin chatbot
npm install             # ~1 minuto primera vez
npm start               # ~2-3 minutos compilación Angular la primera vez, ~1s las siguientes
```

Cuando veas `Compiled successfully.` abre `http://localhost:4200`.

`npm start` corre `prestart` (`node set-env.js`) que **genera** `src/environments/environment.ts` desde `.env` automáticamente. Cero pasos manuales.

**Angular tarda**: la primera compilación es lenta (SSR + PrimeNG + Bootstrap + Swiper + Three.js). Ten paciencia los primeros ~3 minutos. Las siguientes compilaciones (con caché) son ~1s.

### Requisitos

- Node.js 20+ y npm
- Angular CLI se instala como devDep (no requiere `-g`)

### Configuración

`.env` (gitignoreado). Ver `.env.example`. Todas las variables son **opcionales**:

- `CHATBOT_WEBHOOK_URL` — n8n proxy hacia OpenAI (sin él, chatbot no funciona pero web sí)
- `N8N_LEAD_WEBHOOK_URL` — form contacto envía a n8n
- `EMAILJS_*` — notificación fallback

Sin `.env` la web arranca; solo desactiva chatbot + envío de leads.

## Build

```bash
npm run build       # dist/civitech.web/browser
npm run build:ssr   # con server-side rendering
```

## Test

```bash
npm test
```

## Deploy

CI automatizado (`.github/workflows/deploy.yaml`) al merge en `main`. Deploy target: hosting Cloudflare Pages / Netlify. Ver workflow para detalles.

## Estructura

- `src/app/features/` — features por dominio (home, servicios, casos, legal, contacto)
- `src/environments/environment.ts` — **generado**, no editar a mano
- `src/environments/environment.ts.example` — plantilla
- `set-env.js` — pre-build: `.env` → `environment.ts`
- `docs/`, `casos/`, `gbp-domotica/` — assets de contenido
- `SEO-AUDIT.md` — auditoría SEO histórica

## Contribuir

Leer [CONTRIBUTING.md](CONTRIBUTING.md).

## Contacto

- Owner: Xim (@Xim1994)
- Dev: Fabricio (@FabricioLimache)
