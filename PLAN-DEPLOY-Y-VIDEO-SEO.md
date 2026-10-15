# Plan de despliegue y SEO de vídeo · civitech.es

Escrito el 15-oct-2026. Todo lo que se afirma aquí se midió ese día contra producción y trae cómo
reproducirlo. **Si algo no se puede reproducir, no se asume: se vuelve a medir.**

---

## 0. El problema que bloquea todo lo demás

**Lo que se despliega no llega al sitio.**

| | medido |
|---|---|
| `.github/workflows/deploy.yaml` | hace `npm run prerender` y sube por **FTPS a Hostinger**: `46.202.158.245:21`, usuario `u824079794.hostinger`, `server-dir: /` |
| lo que sirve civitech.es de verdad | **CT124**, en `/var/www/civitech.es` · 296 ficheros |
| `index.html` de ese directorio | **2026-10-14 23:43** — alguien lo copió a mano |
| repo git en CT124 | **no hay** |

O sea: el Action despliega a un servidor que nadie sirve, y la web se actualiza a mano.

### El detalle que decide la solución

**CT124 está detrás de Tailscale.** Un runner de GitHub no puede alcanzarlo, así que **no se puede
empujar desde el Action**. El despliegue tiene que invertirse: **que CT124 se lo baje**.

Tres caminos posibles, de más simple a menos:

1. **Pull desde CT124.** El Action construye y publica el resultado como artefacto o lo commitea a
   una rama `gh-pages`/`dist`; un cron o un webhook en CT124 lo descarga y lo descomprime en
   `/var/www/civitech.es`. CT124 sí alcanza GitHub (se comprobó: HTTP 200 contra raw.githubusercontent).
2. **Runner autoalojado** dentro de CT124. Más potente y más mantenimiento.
3. **Tailscale en el runner** (`tailscale/github-action`) para que el Action entre en la red.
   Funciona, pero mete una clave de la red privada en GitHub.

**Esto es una decisión de arquitectura: pasa por Fase 0 y por el OK de Xim antes de construirse.**
No elegir por iniciativa propia.

### Criterio de "hecho" para este punto

Cambiar una cadena visible en el código, hacer merge a `main`, y **comprobar que esa cadena
aparece en `https://civitech.es/` sin que nadie copie nada a mano**. Mientras eso no pase, no está
resuelto.

---

## 1. Cuatro páginas del sitemap devuelven el HTML de la home

Pesan **exactamente 140.930 bytes**, lo mismo byte a byte que `/`, y llevan el título genérico
`"Civitec Domótica Zaragoza · Instalación sin obras"` en vez del suyo:

    /acerca-de-nosotros
    /empresas
    /empresas/hoteles
    /proyectos

**El caso que lo delata**: las siete hermanas de hoteles (`lavanderias`, `hosteleria`,
`apartamentos`, `gimnasios`, `clinicas`, `oficinas`, `comercio`) pesan ~78 KB **con su título
propio**. Solo hoteles se cae. Son cuatro rutas que se quedaron fuera del prerender, no un
problema de diseño.

Reproducir:

    for u in / /acerca-de-nosotros /empresas /empresas/hoteles /empresas/lavanderias /proyectos; do
      echo -n "$u  "; curl -s "https://civitech.es$u" | wc -c
    done
    # las cuatro malas dan 140930, igual que /

**Pista de dónde mirar**: la configuración de rutas del prerender de Angular (el comando
`npm run prerender` y su lista de rutas). Comparar con `app-routing.module.ts`, donde las rutas sí
existen.

## 2. Cinco páginas prerenderizadas con el título por defecto

    /domotica-informacion   /contactanos   /aviso-legal   /politica-privacidad   /politica-cookies

Tienen HTML propio (tamaños distintos) pero comparten título. En las legales es indiferente; en
**`/domotica-informacion` y `/contactanos` no**, que son páginas que posicionan. Hay que darles
título y meta description propios vía `SeoService`.

---

## 3. SEO de vídeo: lo que ya está hecho y lo que falta

### Hecho (sin commitear, en el árbol de trabajo)

`src/app/core/services/schema.service.ts` tiene un método nuevo **`getVideoSchema()`**, escrito
siguiendo el patrón de los que ya había (`getProjectSchema`, `getFAQSchema`): devuelve
`SchemaOrgService` y se inserta con el `insertSchema(schema, id)` existente.

Verificado: `npx tsc --noEmit` da **exit 0**, y con un error metido a propósito da exit 2 y lo
caza, o sea que la comprobación sirve.

### Datos reales de los vídeos, sacados de la API de YouTube

| id | duración | subido | estado | tema |
|---|---|---|---|---|
| `PGCBKFYYqSw` | `PT47S` | 2026-10-08T21:00:46Z | **público** | cerradura inteligente, alquiler sin llaves |
| `ynjSllNMKZo` | `PT55S` | 2026-10-15T14:01:50Z | **público** | la casa hace más que encender luces |
| `YTncYZaT5_k` | `PT15S` | 2026-10-08T20:42:00Z | **privado hasta 22-oct 17:00 UTC** | apagar la TV de los niños |

⚠️ **Solo se declara `VideoObject` de vídeos públicos.** Declarar uno privado es una señal rota
hacia Google. El tercero entra cuando se publique solo el 22-oct.

### Lo que falta, por orden

| | qué | dónde |
|---|---|---|
| 3.1 | **Embeber el vídeo + llamar a `getVideoSchema()`** | `UseCaseDetalleComponent` (sirve `/domotica/:slug`). Cerradura → `seguridad-inteligente`; luces → `confort` |
| 3.2 | Lo mismo en `EmpresaDetalleComponent` para `/empresas/apartamentos` (encaja con la cerradura) | el componente ya usa `SchemaService` |
| 3.3 | **La transcripción publicada como texto** bajo cada vídeo | es lo único que un motor generativo puede leer y citar. Existe la skill `/yt-transcript` para sacarla |
| 3.4 | **Sitemap de vídeo** | el `sitemap.xml` actual declara **solo** `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`. Añadir `xmlns:video` con las entradas, o un `sitemap-video.xml` de verdad declarado en `robots.txt` |
| 3.5 | Enlazar los vídeos desde los casos de éxito de `/proyectos/` | heredan autoridad de páginas que ya posicionan |

⚠️ **`sitemap-video.xml` responde HTTP 200 pero NO existe**: devuelve `<!DOCTYPE html>` con
`content-type: text/html`. Es la SPA contestando a cualquier ruta. Es el mismo fallo que dejó
`robots.txt` y `sitemap.xml` caídos 18 días en septiembre sin que nadie se enterara.

    curl -s -o /dev/null -w '%{content_type}\n' https://civitech.es/sitemap-video.xml
    # text/html   <- si sale esto, no existe

### Estado 15-oct (desplegado)

| | estado | evidencia |
|---|---|---|
| 3.1 embed + `getVideoSchema()` en `/domotica/:slug` | ✅ | prerender local: `VideoObject`=1 y `youtube.com/embed`=2 en `seguridad-inteligente` y `confort` |
| 3.2 ídem en `/empresas/apartamentos` | ✅ | prerender local: `VideoObject`=1, embed=2 |
| 3.3 transcripción visible bajo el vídeo | ✅ | transcripción de la cerradura **verificada contra el audio** (canal "WhatsApp" era falso, se omitió); voz, limpia |
| 3.4 sitemap de vídeo real | ✅ | `src/sitemap-video.xml` dado de alta como asset + en `robots.txt`; se sirve como fichero, no SPA |
| 3.5 enlazar vídeos desde `/proyectos/` | ⛔ diferido | **no hay mapa verificado** proyecto↔vídeo; enlazarlo a ciegas sería inventar la relación. Pendiente de que Xim diga qué caso de éxito usa cada vídeo, o se deja fuera |
| 3.6/3.7/3.8 sameAs + footer + Instagram | ✅ (§7) | YouTube ×3, Instagram `civitec.domotica` ×3, viejo `civitech.es`=0 en vivo |

Control negativo aplicado: una ruta sin vídeo (`optimizacion-solar`) da `VideoObject`=0, así que el
chequeo puede dar negativo. Datos reales de los vídeos en `src/app/core/data/videos.data.ts`.
⏳ El tercer vídeo (TV de los niños, `YTncYZaT5_k`) entra en `/domotica/confort` cuando se publique
solo el **22-oct 17:00 UTC**: añadir su clave a `VIDEO_POR_USECASE['confort']` (hoy solo soporta uno).

---

## 4. Lo que NO hay que tocar

El SEO de la web **está bien hecho** y no es el problema. Medido en las 36 URLs del sitemap:

- **36 de 36** con `rel="canonical"`
- **27 títulos distintos**, y buenos: *"Domótica Lavanderías Zaragoza | Control Remoto | Civitec Domótica"*
- **32 tamaños distintos**: el prerender funciona en casi todo
- marcado rico en la home: `LocalBusiness` ×2, `FAQPage` con 6 Q&A, 5 `Service`, 5 `Offer`,
  `GeoCoordinates`, `AggregateRating`, `OpeningHoursSpecification`
- `robots.txt` correcto, `sitemap.xml` válido con 36 URLs
- 12 páginas de `/domotica/<tema>`, 8 de `/empresas/<nicho>`, 6 casos de éxito en `/proyectos/`

**No rehacer nada de esto.** Lo que falta es la capa de vídeo encima y cuatro rutas fuera del
prerender.

---

## 5. Reglas duras

- **No tocar producción sin OK explícito de Xim**, acción por acción.
- **Nunca `git reset --hard`, `git clean` ni restauración global** en un árbol productivo. El
  21-sep un deploy así se comió 20 días de código hecho a mano en otro contenedor.
- **Un HTTP 200 no prueba que algo exista.** Esta web contesta 200 a cualquier ruta inventada.
  Comprobar siempre el `content-type` y el contenido, no el código de estado.
- **Toda comprobación lleva control positivo**: si no se sabe que puede dar negativo, no acredita
  nada. Pasó cinco veces esta semana: `\|` dentro de `grep -E`, `git grep -I`, un `client_id`
  buscado con el nombre equivocado, un cruce que exigía nombre y apellido, y un límite de 1.000
  filas tomado por el total.
- **Cero cifras inventadas.** Ningún dato sin evidencia cargada en el momento.

---

## 6. Cómo saber que todo esto quedó bien

    # 1 · el despliegue llega solo
    #    cambiar una cadena, merge a main, y verla en https://civitech.es sin copiar nada a mano

    # 2 · las cuatro rutas ya no devuelven el HTML de la home
    for u in /acerca-de-nosotros /empresas /empresas/hoteles /proyectos; do
      echo -n "$u "; curl -s "https://civitech.es$u" | grep -oE '<title>[^<]*'
    done
    # cada una con su título propio, y ninguna con 140930 bytes

    # 3 · los vídeos están declarados
    curl -s https://civitech.es/domotica/seguridad-inteligente | grep -c '"VideoObject"'   # >= 1
    curl -s https://civitech.es/domotica/confort              | grep -c 'youtube.com/embed' # >= 1

    # 4 · el sitemap de vídeo existe DE VERDAD
    curl -s -o /dev/null -w '%{content_type}\n' https://civitech.es/sitemap-video.xml
    # debe ser application/xml o text/xml, NUNCA text/html

    # 5 · validar el marcado en la herramienta de resultados enriquecidos de Google
    #    https://search.google.com/test/rich-results

---

## 7. sameAs / identidad de marca (añadido por Xim, 15-oct) — va en el MISMO lote que §3

Hallazgos concretos (Xim los verificó contra la API):
- **YouTube NO está en el `sameAs`** del schema (solo Facebook, Instagram, TikTok, LinkedIn) y **no se enlaza** desde ninguna parte de la home. El `sameAs` es como le dices a Google "estos perfiles y yo somos la misma empresa"; para el canal no existe esa declaración.
- **Incoherencia de Instagram que puede costar caro:** el `sameAs` declara `instagram.com/civitech.es`, pero la cuenta real desde la que se publica es **`civitec.domotica`**. Google asocia a la marca una cuenta que NO es la que usa.
- Marca partida en dos: `civitech.es` vs "Civitec Domótica", dos fichas de Google (una es "Civitec Reformas"), dos cuentas de Instagram, carpeta de la Cámara "CIVITEC REFORMAS". Google no sabe quién eres.

Qué hacer (cambios pequeños en el componente del schema + el footer, mismo lote que §3):
| | qué | dónde |
|---|---|---|
| 3.6 | **Añadir YouTube al `sameAs`**: `https://www.youtube.com/@civitec-domotica` | `schema.service.ts` (array `sameAs` del LocalBusiness/Organization) |
| 3.7 | **Enlazar YouTube desde el footer** (como ya se hace con FB/IG/TikTok/LinkedIn) | componente de footer/header |
| 3.8 | **Decidir el Instagram canónico** y que el `sameAs` apunte a ÉL (hoy `civitech.es`; la real es `civitec.domotica`) — CONFIRMAR con Xim cuál | `schema.service.ts` |

Fuera de la web (tareas de Xim, NO código): añadir el canal YouTube en Google Business Profile; **resolver las 2 fichas de Google + la marca partida** (esto sí mueve ranking de verdad).

⚠️ Honesto: declarar el `sameAs` hace que Google PUEDA asociarlo; que lo muestre junto a la marca depende de que te rastree y de que haya señales. Sin la declaración no pasa nunca — y ahora mismo no está.
