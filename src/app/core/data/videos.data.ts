/**
 * Fuente unica de los videos de la web (datos reales de la API de YouTube,
 * transcripciones corregidas a mano el 15-oct-2026).
 *
 * REGLA: solo se declara VideoObject / se embebe de videos PUBLICOS. Declarar
 * uno privado es una senal rota hacia Google. El tercero (TV de los ninos,
 * YTncYZaT5_k) se publica solo el 22-oct-2026 17:00 UTC -> entra entonces en
 * VIDEO_POR_USECASE['confort'] como segundo video.
 */

export interface VideoDato {
    /** id de YouTube */
    id: string;
    /** titulo publicado en YouTube */
    titulo: string;
    /** descripcion factual del contenido, para el VideoObject */
    descripcion: string;
    /** duracion en formato ISO 8601 (API de YouTube) */
    duracionISO: string;
    /** duracion en segundos, para el sitemap de video */
    duracionSeg: number;
    /** fecha de subida ISO (API de YouTube) */
    subidoISO: string;
    /** transcripcion visible, un parrafo/linea por entrada */
    transcripcion: string[];
}

export const VIDEOS: { [clave: string]: VideoDato } = {
    cerradura: {
        id: 'PGCBKFYYqSw',
        titulo: 'Alquila tu piso sin entregar llaves: cerradura inteligente | Civitec Domótica Zaragoza',
        descripcion: 'Cómo alquilar un piso sin entregar llaves con una cerradura inteligente: generar un código de acceso y enviárselo al huésped, que el código deje de funcionar tras la estancia y recibir un aviso con cada acceso a la vivienda.',
        duracionISO: 'PT47S',
        duracionSeg: 47,
        subidoISO: '2026-10-08T21:00:46Z',
        // Transcripcion verificada contra el audio (faster-whisper base + small,
        // 15-oct). El canal de envio del codigo no es inteligible en el audio
        // (ambos modelos oyen "por el mode/modo") y se omite por no poder
        // acreditarlo; el resto es fiel a lo que se dice.
        transcripcion: [
            '¿Sabías que puedes alquilar tu piso sin entregar ni una sola llave?',
            'Si tienes un piso de alquiler, seguro que conoces este problema: fijar la hora de llegada, entregar las llaves o buscar algún sitio donde dejarlas.',
            'Con una cerradura inteligente todo esto puede cambiar. Puedes generar un código de acceso y enviárselo al huésped. Así, cuando llega, introduce el código y entra sin problemas, sin llaves. Además, después de irse, ese código deja de funcionar y ya no puede abrir esa puerta. Incluso puedes recibir un aviso con cada evento de acceso a la vivienda.',
            'Así evitas duplicar llaves y desplazamientos, y gestionas el acceso a la vivienda estés donde estés.',
            'Si tienes un piso en alquiler y quieres olvidarte de entregar las llaves, escríbenos.'
        ]
    },
    voz: {
        id: 'ynjSllNMKZo',
        titulo: 'Tu casa puede hacer mucho más que encender las luces | Civitec Domótica Zaragoza',
        descripcion: 'Demostración de control por voz de una vivienda con Home Assistant: encender las luces, consultar el estado de la casa, encender la televisión y el aire acondicionado y fijar la temperatura, todo hablando con el asistente de voz.',
        duracionISO: 'PT55S',
        duracionSeg: 55,
        subidoISO: '2026-10-15T14:01:50Z',
        transcripcion: [
            'Así te recibe una casa inteligente.',
            '— Okay Nabu, ya estoy en casa.',
            '— Enciende la luz del comedor.',
            '— ¿Cómo está la casa?',
            '— El salón está a 17,5 grados, persianas abiertas.',
            '— Enciende la televisión.',
            '— Tengo calor.',
            '— Enciende el aire del salón.',
            '— Pon el aire a 22 grados.',
            '— Me voy de casa.'
        ]
    },
    // PRIVADO hasta el 22-oct-2026 17:00 UTC (oEmbed da 403). NO esta en los mapas
    // de abajo todavia: cuando sea publico, anadir 'tvninos' a VIDEO_POR_USECASE['confort'].
    tvninos: {
        id: 'YTncYZaT5_k',
        titulo: 'Apagar la TV de los niños a la hora de dormir, sola | Civitec Domótica Zaragoza',
        descripcion: 'Cómo monitorizar el tiempo de televisión de los niños y apagar la tele automáticamente a la hora que elijas, con control de qué canales ven.',
        duracionISO: 'PT15S',
        duracionSeg: 15,
        subidoISO: '2026-10-08T20:42:00Z',
        transcripcion: [
            '¿Cansado de que tus hijos estén viendo la tele hasta las tantas?',
            'Monitoriza el tiempo de televisión y apágala a la hora que tú quieras. Además, puedes monitorizar qué canales están viendo y apagarla a las dos horas.',
            'Escríbenos si quieres más información.'
        ]
    }
};

/** ruta /domotica/:slug -> claves de VIDEOS (LISTA, solo publicos). Varios por pagina. */
export const VIDEO_POR_USECASE: { [slug: string]: string[] } = {
    'seguridad-inteligente': ['cerradura'],
    // 22-oct-2026 (cuando 'tvninos' sea publico): ['voz', 'tvninos']
    'confort': ['voz']
};

/** ruta /empresas/:slug -> claves de VIDEOS (LISTA, solo publicos) */
export const VIDEO_POR_EMPRESA: { [slug: string]: string[] } = {
    'apartamentos': ['cerradura']
};
