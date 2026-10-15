# SEO y GEO de civitech.es y de los vídeos · auditoría 15-oct-2026

Medido contra producción con las **36 URLs reales del sitemap**, una a una, con User-Agent de
Googlebot. Cada afirmación trae cómo reproducirla.

> ⚠️ **Corrección de la primera versión de este documento.** La primera pasada comprobó `/`,
> `/domotica` y `/blog`, y **las dos últimas no existen**: la aplicación devuelve la cáscara para
> cualquier ruta, así que medí tres veces lo mismo y concluí que no había prerender. **Era falso.**
> Con las rutas reales salen **32 tamaños distintos y 27 títulos distintos**: el prerender
> funciona. Lo que sigue está medido sobre las rutas del sitemap.

---

## Lo que está BIEN, y es la mayor parte

| | medido |
|---|---|
| `sitemap.xml` | HTTP 200, `text/xml`, **36 URLs**, XML válido |
| `robots.txt` | correcto, apunta al sitemap |
| **canonical** | **36 de 36 páginas** lo llevan |
| **títulos propios** | **27 distintos de 36**, y buenos: *"Domótica Lavanderías Zaragoza \| Control Remoto \| Civitec Domótica"*, *"Domótica Apartamentos Turísticos Zaragoza"*, *"Protección contra Inundaciones"* |
| **prerender** | funciona: 32 tamaños distintos, de 53 KB a 141 KB según la página |
| marcado de la home | `LocalBusiness` ×2, `FAQPage` con 6 Q&A, 5 `Service`, 5 `Offer`, `GeoCoordinates`, `PostalAddress`, `AggregateRating`, `OpeningHoursSpecification` |
| estructura | 12 páginas de `/domotica/<tema>`, 8 de `/empresas/<nicho>` y **6 casos de éxito en `/proyectos/`** |

**Los casos de éxito que querías montar ya existen**: `/proyectos/lavanderia-autowash`,
`/proyectos/casa-huesca-integral`, `/proyectos/chalet-tesla-airzone`,
`/proyectos/casa-rural-control-total`, `/proyectos/taller-ia-carga-zaragoza`,
`/proyectos/vivienda-autosuficiente-ia`.

---

## Lo que falla, ahora sí medido

### 1. Cuatro páginas del sitemap devuelven el HTML de la home

Estas cuatro pesan **exactamente 140.930 bytes**, el mismo byte a byte que `/`, y llevan el título
genérico en vez del suyo:

    /acerca-de-nosotros      140930  "Civitec Domótica Zaragoza · Instalación sin obras"
    /empresas                140930  idem
    /empresas/hoteles        140930  idem
    /proyectos               140930  idem

**`/empresas/hoteles` es el caso que lo delata**: sus siete hermanas (`lavanderias`, `hosteleria`,
`apartamentos`, `gimnasios`, `clinicas`, `oficinas`, `comercio`) pesan ~78 KB **con su título
propio**. Solo hoteles se cae. No es un problema de diseño: son cuatro rutas que se quedaron fuera
del prerender.

### 2. Cinco páginas prerenderizadas pero con el título por defecto

    /domotica-informacion   /contactanos   /aviso-legal
    /politica-privacidad    /politica-cookies

Tienen su propio HTML pero comparten el título genérico. En las legales da igual; en
**`/domotica-informacion` y `/contactanos` no**, que son páginas que posicionan.

### 3. Cero vídeos en todo el sitio

    embeds de YouTube en las 36 páginas: 0
    VideoObject en las 36 páginas:       0

Esto es lo único de mi primera versión que se mantiene, y ahora está comprobado en las 36, no en
tres inventadas.

### 4. No hay sitemap de vídeo

`sitemap-video.xml` devuelve `<!DOCTYPE html>` con `content-type: text/html`: es la aplicación
respondiendo 200 a una ruta que no existe. Y el `sitemap.xml` declara **solo** el namespace básico
`xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`, sin `xmlns:video`.

### 5. Para GEO, un vídeo sigue siendo invisible

Los motores generativos leen texto, no ven vídeo. Que ChatGPT devuelva enlaces de YouTube no
significa que lea el vídeo: significa que encuentra su **página de YouTube**, con su título y su
descripción. Para que cite a Civitec como fuente hace falta texto nuestro, rastreable, en
civitech.es.

---

## El plan

**Antes de nada, el obstáculo de despliegue.** Anotado el 14-oct: `civitech.es` se sirve desde
CT124 `/var/www/civitech.es`, y el GitHub Action despliega a Hostinger, que está muerto. Mientras
siga así, **ningún cambio llega al sitio**. Esto va primero o trabajamos para nada.

| | qué | por qué |
|---|---|---|
| 1 | **Meter al prerender** `/acerca-de-nosotros`, `/empresas`, `/empresas/hoteles`, `/proyectos` | cuatro páginas del sitemap sirviendo contenido equivocado. Es el fallo más caro y el más barato de arreglar |
| 2 | **Título y meta propios** en `/domotica-informacion` y `/contactanos` | páginas que posicionan compartiendo título |
| 3 | **Embeber cada vídeo en la página de su tema** con `VideoObject` en JSON-LD | el de la cerradura en `/domotica/seguridad-inteligente` y en `/empresas/apartamentos`; el de las luces en `/domotica/confort`; el de la TV en `/domotica/confort`. No páginas nuevas: las que ya posicionan |
| 4 | **La transcripción como texto** bajo cada vídeo | es lo único que un motor generativo puede leer y citar. Ya existe `/yt-transcript` |
| 5 | **Sitemap de vídeo**: `xmlns:video` en el sitemap actual, o `sitemap-video.xml` de verdad declarado en `robots.txt` | sin esto Google no sabe que hay vídeo |
| 6 | **Enlazar los vídeos desde los casos de éxito** de `/proyectos/` | un vídeo enlazado desde una página que ya posiciona hereda autoridad |

## Lo que no hay que esperar

Esto hará que los vídeos puedan salir en Google y ser citables. **No** los va a poner por delante
en "domótica Zaragoza" a corto plazo: el canal tiene siete días, 0 suscriptores y 2 vídeos
públicos. Por marca propia sí; por genéricos hace falta volumen y meses.

## Cómo reproducir todo esto

    # las 36 rutas, una a una, con User-Agent de Googlebot:
    # status, bytes, embeds de youtube, VideoObject, canonical y <title>
    curl -s https://civitech.es/sitemap.xml | grep -oE '<loc>[^<]+'
    curl -s -o /dev/null -w '%{content_type}' https://civitech.es/sitemap-video.xml   # text/html
