# Plan hacia B — civitecdomotica.es como dominio PRINCIPAL (cuando toque)

Escrito el 15-oct-2026. Decisión de Xim: **ahora A (seguro), con plan hacia B.**

## Dónde estamos (Plan A, hecho el 15-oct)
- **civitech.es = dominio principal** (sirve la web en Cloudflare Pages, tiene TODO el SEO: 36 URLs posicionando).
- **civitecdomotica.es** → movido a Cloudflare (NS `dante`/`kate.ns.cloudflare.com`), custom domain del proyecto Pages `civitec-domotica`, con **`_redirects` → 301 a civitech.es**.
- La marca visible ya es "Civitec Domótica"; solo el dominio lleva la "H" heredada.

**Por qué A y no B directo:** redirigir civitech.es → civitecdomotica.es **migra la autoridad SEO a un dominio con autoridad 0** → caída temporal de posiciones semanas/meses. No se hace a la ligera.

## Cuándo pasar a B
Solo cuando: (1) la **marca esté consolidada** (resueltos los líos de `sameAs`/Instagram/2 fichas Google/carpeta "CIVITEC REFORMAS" — ver `PLAN-DEPLOY-Y-VIDEO-SEO.md §7`), y (2) haya **ancho de banda** para vigilar rankings unas semanas. No con prisa ni en temporada alta de leads.

## Cómo hacer B BIEN (checklist, en este orden)
1. **Search Console:** dar de alta `civitecdomotica.es` como propiedad y verificarla.
2. **Contenido canónico:** en el Angular (`SeoService`/`schema.service.ts`), cambiar `url`/`canonical`/`sameAs`/sitemap de civitech.es → **civitecdomotica.es**. Un solo canónico nuevo en TODAS las páginas.
3. **Servir desde civitecdomotica.es:** quitar sus líneas del `_redirects` (deja de redirigir, pasa a servir la web).
4. **Invertir el redirect:** en `_redirects`, poner `https://civitech.es/* https://civitecdomotica.es/:splat 301` (y www). civitech.es pasa a redirigir al nuevo.
5. **Search Console → "Cambio de dirección"** (Change of Address) de civitech.es a civitecdomotica.es. Es la señal que acelera el traspaso de autoridad.
6. **Mantener civitech.es redirigiendo PARA SIEMPRE** (los 301 tienen que persistir para pasar el link juice; no dejar caducar el dominio).
7. **Reenviar el sitemap** nuevo y pedir indexación de las URLs clave.
8. **Vigilar 4-8 semanas:** esperar un bache y la recuperación. No revertir por el bache (es normal).

## Lo que NO hay que hacer
- B sin la marca consolidada primero → le cuentas a Google dos historias y el traspaso sale peor.
- Quitar el redirect de civitech.es en algún momento → perderías toda la autoridad acumulada.
- Cambiar canónicos a medias (unas páginas a un dominio, otras a otro) → contenido duplicado.

Relacionado: `PLAN-DEPLOY-Y-VIDEO-SEO.md` (SEO general + §7 marca) · `_redirects` (estado actual A).
