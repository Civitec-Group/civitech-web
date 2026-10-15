import { Component } from '@angular/core';

import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.scss']
})
export class ContactanosComponent {

  // Opiniones de relleno retiradas. Solo contenido real.
  opiniones: { src: string; nombre: string; resenia: string }[] = [];

  constructor(private seo: SeoService) {
    this.seo.updateSeo({
      title: 'Contacto | Presupuesto Gratis de Domótica en Zaragoza | Civitec Domótica',
      description: 'Contacta con Civitec Domótica en Zaragoza y pide tu presupuesto gratis de domótica, energía y seguridad para tu hogar o negocio. Instalación sin obras, sin cuotas.',
      keywords: 'contacto domótica zaragoza, presupuesto domótica gratis, instalador domótica zaragoza, civitec domótica contacto',
      url: 'https://civitech.es/contactanos'
    });
  }

}
