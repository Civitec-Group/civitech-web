import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { environment } from '../../../../environments/environment';
import { OrigenService } from '../../../core/services/origen.service';

@Component({
  selector: 'formulario-contacto-civitech',
  templateUrl: './formulario-contacto.component.html',
  styleUrls: ['./formulario-contacto.component.scss']
})
export class FormularioContactoComponent {
  private isBrowser: boolean;
  /**
   * URL del webhook n8n para leads.
   * Se configura en .env → N8N_LEAD_WEBHOOK_URL
   * Si está vacío, solo se usa Web3Forms (que es el canal principal).
   */
  private n8nLeadWebhookUrl: string = environment.n8nLeadWebhookUrl || '';

  constructor(
    private analytics: AnalyticsService,
    private origen: OrigenService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  onFormSubmit(event: Event): void {
    const form = event.target as HTMLFormElement;
    // Origen en el correo de Web3Forms: se rellena ANTES de que el navegador recoja los datos del
    // envio nativo (el handler de submit corre antes). Si algo falla, el formulario sale igual.
    try {
      const campo = form.querySelector('input[name="origen"]') as HTMLInputElement | null;
      if (campo) campo.value = this.lineaOrigen();
    } catch { /* nada */ }

    const formData = new FormData(form);

    // Track en GA4
    this.analytics.trackFormSubmit('contacto');

    // Enviar a n8n webhook (no-bloqueante, Web3Forms es el canal principal)
    if (this.isBrowser && this.n8nLeadWebhookUrl) {
      const leadData = {
        name: formData.get('name'),
        apellido: formData.get('apellido'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        message: formData.get('message'),
        source: 'web_form',
        timestamp: new Date().toISOString(),
        // Origen del lead (utm_*, gclid, fbclid, referrer, landing_page, first_seen, page).
        // Contrato con el flujo n8n lead-civitech-web: no renombrar.
        ...this.origenSeguro()
      };

      fetch(this.n8nLeadWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
        // keepalive: el submit a Web3Forms navega fuera de la pagina y sin esto el navegador
        // puede cortar la peticion a n8n a medias (el lead no llegaria a Odoo)
        keepalive: true
      }).catch(() => {}); // Silent fail — Web3Forms es el canal principal
    }

    // El formulario sigue su submit normal hacia Web3Forms
  }

  /** "utm_source=instagram · utm_medium=bio · entró por /domotica/ · envió desde /contactanos/" */
  private lineaOrigen(): string {
    const o = this.origen.paraEnvio();
    const partes: string[] = [];
    (['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const).forEach(k => {
      if (o[k]) partes.push(k + '=' + o[k]);
    });
    if (o.gclid) partes.push('gclid (Google Ads)');
    if (o.fbclid) partes.push('fbclid (Meta)');
    if (!partes.length) partes.push('sin campaña');
    if (o.referrer) partes.push('vino de ' + o.referrer);
    if (o.landing_page) partes.push('entró por ' + o.landing_page);
    if (o.page) partes.push('envió desde ' + o.page);
    return partes.join(' · ').slice(0, 900);
  }

  private origenSeguro(): object {
    try {
      return this.origen.paraEnvio();
    } catch {
      return {};
    }
  }
}
