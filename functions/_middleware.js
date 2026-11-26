// Redirecciones 301 de civitech.es — Cloudflare Pages Function (26-nov-2026).
//
// Por que aqui y no en _redirects: Cloudflare Pages IGNORA las reglas de dominio del _redirects
// (las lineas "https://civitecdomotica.es/* ..." estaban desde el 15-oct y nunca funcionaron:
// civitecdomotica.es y www.civitech.es daban 200 con la misma pagina, y Google indexaba DOS webs).
// Y el token de Cloudflare que tenemos no puede crear reglas de zona. Una Function si ve el dominio.
//
// Una sola web para Google: https://civitech.es
//  1. Cualquier otro dominio que llegue a este proyecto (www.civitech.es, civitecdomotica.es,
//     www.civitecdomotica.es) -> 301 a https://civitech.es con la MISMA ruta y query.
//  2. URL viejas que Google todavia conoce (Search Console, 26-nov) -> 301 a su pagina nueva.
//     Cualquier otra .html vieja -> 301 a la home.
// Lo demas sigue su camino normal (next): las paginas prerenderizadas y el 404.html de verdad.
// Los *.pages.dev (previews de Cloudflare) NO se redirigen, para poder probar ramas.

const CANONICO = 'civitech.es';
const OTROS = ['www.civitech.es', 'civitecdomotica.es', 'www.civitecdomotica.es'];

const VIEJAS = {
  '/empresas.html': '/empresas/',
  '/empresas/clinicas.html': '/empresas/clinicas/',
  '/proyectos.html': '/proyectos/',
  '/domotica/iluminacion-diseno': '/domotica/confort/',
  '/domotica/seguridad-alarmas-sin-cuotas': '/domotica/seguridad-inteligente/',
};

function destinoViejo(ruta) {
  const sinBarra = ruta.length > 1 ? ruta.replace(/\/+$/, '') : ruta;
  if (VIEJAS[ruta]) return VIEJAS[ruta];
  if (VIEJAS[sinBarra]) return VIEJAS[sinBarra];
  if (/\/index\.html?$/i.test(ruta)) return ruta.replace(/index\.html?$/i, '');
  if (/\.html?$/i.test(ruta) && ruta !== '/404.html') return '/';
  return null;
}

export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);
    const host = url.hostname.toLowerCase();
    const viejo = destinoViejo(url.pathname);

    if (OTROS.includes(host)) {
      return Response.redirect('https://' + CANONICO + (viejo || url.pathname) + url.search, 301);
    }
    if (host === CANONICO && viejo) {
      return Response.redirect('https://' + CANONICO + viejo + url.search, 301);
    }
  } catch (e) {
    // una redireccion que falla no puede tumbar la web: se sirve la pagina tal cual
  }
  return context.next();
}
