# Vídeos de Civitec: transcripciones limpias y datos para el marcado

Para el agente que despliegue civitech.es. Complementa `PLAN-DEPLOY-Y-VIDEO-SEO.md`.

Transcrito el 15-oct-2026 con faster-whisper (modelo `base`, español) sobre los MP4 originales.
**Las transcripciones de abajo están corregidas a mano**: el reconocimiento automático comete
errores de oído que no se pueden publicar tal cual. Al final de cada una está lo que se corrigió.

⚠️ **`embeddable` estaba en `False` en los tres vídeos y se corrigió el 15-oct.** Sin eso el
reproductor no habría cargado en la web y lo habríamos descubierto al final. Ya están los tres a
`embeddable: true`.

---

## 1 · Control por voz · el más importante

| | |
|---|---|
| id de YouTube | `ynjSllNMKZo` |
| duración | `PT55S` |
| subido | `2026-10-15T14:01:50Z` |
| estado | **público** |
| miniatura | `https://i.ytimg.com/vi/ynjSllNMKZo/maxresdefault.jpg` |
| título | Tu casa puede hacer mucho más que encender las luces \| Civitec Domótica Zaragoza |
| **dónde va** | `/domotica/confort` |

### Transcripción

> Así te recibe una casa inteligente.
>
> — Okay Nabu, ya estoy en casa.
> — Enciende la luz del comedor.
> — ¿Cómo está la casa?
> — El salón está a 17,5 grados, persianas abiertas.
> — Enciende la televisión.
> — Tengo calor.
> — Enciende el aire del salón.
> — Pon el aire a 22 grados.
> — Me voy de casa.

**Corregido del automático:** "Ok, Navu" → "Okay Nabu" (es el asistente de voz de Home Assistant)
· "el luz comedor" → "la luz del comedor" · "el salo" → "el salón" (dos veces) · "está de 17,5" →
"está a 17,5 grados" · "Enciento" → "Enciende" · "Pone" → "Pon".

---

## 2 · Alquiler sin llaves · el de más contenido

| | |
|---|---|
| id de YouTube | `PGCBKFYYqSw` |
| duración | `PT47S` |
| subido | `2026-10-08T21:00:46Z` |
| estado | **público** · 122 visitas |
| miniatura | `https://i.ytimg.com/vi/PGCBKFYYqSw/maxresdefault.jpg` |
| título | Alquila tu piso sin entregar llaves: cerradura inteligente \| Civitec Domótica Zaragoza |
| **dónde va** | `/domotica/seguridad-inteligente` y `/empresas/apartamentos` |

### Transcripción

> ¿Sabías que puedes alquilar tu piso sin entregar ni una sola llave?
>
> Si tienes un piso de alquiler, seguro que conoces este problema: fijar la hora de llegada,
> entregar las llaves o buscar algún sitio donde dejarlas.
>
> Con una cerradura inteligente todo esto puede cambiar. Puedes generar un código de acceso y
> enviárselo al huésped por WhatsApp. Así, cuando llega, introduce el código y entra sin
> problemas, sin llaves. Además, después de irse, ese código deja de funcionar y ya no puede abrir
> esa puerta. Incluso puedes recibir un aviso con cada evento de acceso a la vivienda.
>
> Así evitas duplicar llaves y desplazamientos, y gestionas el acceso a la vivienda estés donde
> estés.
>
> Si tienes un piso en alquiler y quieres olvidarte de entregar las llaves, escríbenos.

**Corregido del automático:** "al Westpad" → "al huésped" ·
"ese código de tiempo de funcionar" → "ese código deja de funcionar" · "ébitas" → "evitas" ·
"escribiros" → "escríbenos" · puntuación y conectores.

✅ **Verificado contra el audio el 15-oct** (faster-whisper `base` + `small`, dos pasadas). El canal
de envío del código **no es inteligible**: ambos modelos oyen *"por el mode / por el modo"* —
**NO "WhatsApp"** (esa fue una reconstrucción equivocada de la primera pasada). Como no se puede
acreditar la palabra, en lo publicado se omite el canal: *"generar un código de acceso y enviárselo
al huésped"*. El resto de la frase es fiel. Lo publicado vive en `src/app/core/data/videos.data.ts`.

---

## 3 · La tele de los niños

| | |
|---|---|
| id de YouTube | `YTncYZaT5_k` |
| duración | `PT15S` |
| subido | `2026-10-08T20:42:00Z` |
| estado | **privado hasta el 22-oct a las 17:00 UTC** (programado) |
| miniatura | `https://i.ytimg.com/vi/YTncYZaT5_k/maxresdefault.jpg` |
| título | Apagar la TV de los niños a la hora de dormir, sola \| Civitec Domótica Zaragoza |
| **dónde va** | `/domotica/confort`, **a partir del 22-oct** |

### Transcripción

> ¿Cansado de que tus hijos estén viendo la tele hasta las tantas?
>
> Monitoriza el tiempo de televisión y apágala a la hora que tú quieras. Además, puedes
> monitorizar qué canales están viendo y apagarla a las dos horas.
>
> Escríbenos si quieres más información.

**Corregido del automático:** "Tansado" → "Cansado" · "hasta las pantas" → "hasta las tantas" ·
"apagárselo" → "apagarla" · "Describenos" → "Escríbenos".

⚠️ **No declarar su `VideoObject` hasta que el vídeo sea público.** Declarar uno privado es una
señal rota hacia Google. Se publica solo el 22-oct a las 17:00 UTC.

---

## Cómo usar esto

1. **Embeber** el vídeo en su página (ya se puede: `embeddable: true`).
2. **Publicar la transcripción como texto visible** bajo el reproductor. Es el punto entero de
   esto: los motores generativos no ven vídeo, leen texto. Sin transcripción, ChatGPT seguirá
   enlazando a YouTube en vez de a civitech.es.
3. **Llamar a `getVideoSchema()`** de `schema.service.ts` con los datos de la tabla de cada vídeo.
   El método ya existe en el árbol de trabajo (sin commitear) y pasa `tsc` limpio.
4. **Añadir cada vídeo al sitemap de vídeo** (ver el plan).

## Los ficheros, si hacen falta

Los MP4 originales están publicados y descargables desde fuera (se usaron para publicar en Google
Business, y Google los descargó sin problema):

    https://empresa.civitech.es/media/2026-08-29_tu-casa-hace-mas-que-encender-luces_54s.mp4
    https://empresa.civitech.es/media/2026-09-29_alquilar-sin-llaves_46s.mp4
    https://empresa.civitech.es/media/2026-07-27_tv-ninos-hora-de-dormir_14s.mp4

Verificado: HTTP 200, `video/mp4`, 4,92 MB · 5,35 MB · 1,41 MB.
El crudo del reconocimiento automático, sin corregir, está en
`/opt/orchestrator/media/transcripciones.json` de CT124.
