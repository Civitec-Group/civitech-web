# Pendiente: el SeoService pisa el canonical al entrar directo

**Medido el 9-oct-2026 con navegador real contra producción.**

## Qué pasa

| Prueba | Título | Canonical |
|---|---|---|
| Home, carga directa | correcto | `https://civitech.es/` ✅ |
| **Navegando por dentro** (SPA) a `/domotica-informacion` | correcto | `/domotica-informacion` ✅ |
| **Carga directa** de `/domotica/seguridad-inteligente` | **el de la home** ❌ | **`https://civitech.es/`** ❌ |

El HTML prerenderizado **sí trae el título correcto** (*"Seguridad y cerraduras inteligentes |
Domótica Zaragoza | Civitec"*). Al ejecutarse el JavaScript, el `SeoService` lo sobrescribe con
el de la home y pone el canonical apuntando a la raíz.

**Consecuencia:** todas las páginas de servicio le dicen a Google *"la buena es la home,
ignórame"*. Justo las páginas a las que apuntan los vídeos de YouTube.

## Dónde está

`src/app/core/services/seo.service.ts`

```ts
constructor(...) {
    this.updateSeoForCurrentRoute();   // <- corre en el CONSTRUCTOR
    if (this.isBrowser) this.setupRouteListener();
}

private updateSeoForCurrentRoute(): void {
    const currentUrl = this.router.url;   // <- en carga directa todavía vale '/'
    this.updateSeo(this.getSeoConfigForRoute(currentUrl));
}
```

En carga directa, el constructor corre **antes** de que el router resuelva la navegación
inicial, así que `router.url` vale `/` y se aplica la configuración de la home. El
`setupRouteListener` debería corregirlo en el `NavigationEnd` siguiente, y en producción no lo
hace. Al navegar por dentro sí funciona, porque ahí el `NavigationEnd` llega con la URL buena.

El mapa de rutas y el fallback están **bien**: `configs[url] || { ..., url: baseUrl + url }`
construiría el canonical correcto si `url` fuese la de verdad.

## Qué habría que probar (por orden de sospecha)

1. Que el `NavigationEnd` inicial se esté perdiendo porque el servicio se instancia después.
   Añadir al listener `filter(... )` con `startWith` o suscribirse antes, y comprobar que en
   carga directa llega el evento.
2. Usar `location.pathname` en vez de `router.url` en el constructor, que en carga directa ya
   trae la ruta buena.
3. Comprobar si en el build desplegado falta parte del código: `"Domótica para gimnasios"` está
   en el fuente y **no** en `main.7318b0b0fe33153e.js` de producción.

## Y otra cosa del mismo despliegue: el prerender desplegado NO es el configurado

**Corregido el 9-oct:** la configuración de `angular.json` está bien, tiene **35 rutas** e
incluye las 12 de `/domotica/`. No hay que añadir nada. El problema es que **lo desplegado no
sale de esa configuración**:

| Sección | Rutas configuradas | Ficheros en el servidor |
|---|---|---|
| `/domotica/` | **12** | **3** |
| `/empresas/` | 7 | **8** ← más de los configurados |
| `/proyectos/` | 6 | **3** |
| **Total** | 35 rutas | **25 ficheros `.html`** |

Que `/empresas/` tenga *más* páginas desplegadas que las configuradas descarta que sea
simplemente un build viejo: **son configuraciones distintas**. El paquete en producción salió de
una versión del proyecto que ya no es la que hay en el repo.

El proyecto **compila**: `node_modules` instalado (436 MB), Angular 16.2, y existen los objetivos
`build:ssr` y `prerender` (`npm run prerender`). Una pasada de prerender con la configuración
actual generaría las 9 páginas de domótica que hoy faltan.

## Contexto: producción y código no coinciden

| | |
|---|---|
| `main.js` desplegado | `main.7318b0b0fe33153e.js` (21-sep) |
| `main.js` compilado en local | `main.2509815de74f9552.js` |

El despliegue del 21-sep, el de la migración a nginx en CT124, además **se dejó `robots.txt` y
`sitemap.xml`**: dieciocho días sirviendo HTML donde Google esperaba el mapa del sitio. Eso ya
está arreglado a mano (9-oct) y vigilado por
`scripts/vigilante_seo_geo.py` (CT124, cron 07:30).

**Antes de volver a desplegar esta web, comprobar que el paquete lleva `robots.txt` y
`sitemap.xml`.** Se perdieron una vez.
