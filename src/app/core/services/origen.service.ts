import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Origen del lead (26-nov-2026).
 *
 * En la PRIMERA pagina que visita alguien se guarda de donde viene (utm, gclid/fbclid, referrer
 * externo y pagina de entrada) en localStorage `civitec_origen`, 30 dias. Solo se sobrescribe si
 * una visita nueva llega con campana (algun utm, gclid o fbclid). Al enviar el formulario, esos
 * campos viajan al webhook de n8n `lead-civitech-web`, que los pasa al lead de Odoo.
 *
 * Los nombres de campo son un CONTRATO con el flujo de n8n: no cambiarlos sin cambiar el flujo.
 * Nada de esto puede romper la pagina: todo va en try/catch y solo en el navegador.
 */
const CLAVE = 'civitec_origen';
const DIAS = 30;
const CAMPANA = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
const PROPIOS = ['civitech.es', 'civitecdomotica.es'];

export interface OrigenLead {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  gclid: string;
  fbclid: string;
  referrer: string;
  landing_page: string;
  first_seen: string;
  page: string;
}

@Injectable({ providedIn: 'root' })
export class OrigenService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /** Se llama una vez al arrancar la app (AppComponent), en la pagina de entrada. */
  capturar(): void {
    if (!this.isBrowser) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const conCampana = CAMPANA.some(k => !!params.get(k));
      if (this.leer() && !conCampana) return;

      const o: { [k: string]: string | number } = {};
      CAMPANA.forEach(k => (o[k] = (params.get(k) || '').slice(0, 200)));
      o['referrer'] = this.referrerExterno();
      o['landing_page'] = (window.location.pathname + window.location.search).slice(0, 500);
      o['first_seen'] = new Date().toISOString();
      o['expira'] = Date.now() + DIAS * 24 * 60 * 60 * 1000;
      localStorage.setItem(CLAVE, JSON.stringify(o));
    } catch {
      // sin localStorage (modo privado, bloqueado): no se guarda origen y la web sigue igual
    }
  }

  /** Campos que se anaden al envio del formulario. Siempre devuelve todas las claves. */
  paraEnvio(): OrigenLead {
    const o = this.leer() || {};
    const txt = (k: string) => (typeof o[k] === 'string' ? (o[k] as string) : '');
    let page = '';
    try {
      page = this.isBrowser ? window.location.pathname : '';
    } catch { /* nada */ }
    return {
      utm_source: txt('utm_source'),
      utm_medium: txt('utm_medium'),
      utm_campaign: txt('utm_campaign'),
      utm_content: txt('utm_content'),
      utm_term: txt('utm_term'),
      gclid: txt('gclid'),
      fbclid: txt('fbclid'),
      referrer: txt('referrer'),
      landing_page: txt('landing_page'),
      first_seen: txt('first_seen'),
      page
    };
  }

  private leer(): { [k: string]: unknown } | null {
    if (!this.isBrowser) return null;
    try {
      const raw = localStorage.getItem(CLAVE);
      if (!raw) return null;
      const o = JSON.parse(raw);
      if (!o || typeof o.expira !== 'number' || o.expira < Date.now()) {
        localStorage.removeItem(CLAVE);
        return null;
      }
      return o;
    } catch {
      return null;
    }
  }

  private referrerExterno(): string {
    try {
      const ref = document.referrer || '';
      if (!ref) return '';
      const host = new URL(ref).hostname.toLowerCase().replace(/^www\./, '');
      if (PROPIOS.indexOf(host) > -1) return '';
      return ref.slice(0, 500);
    } catch {
      return '';
    }
  }
}
