import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'domotica-informacion',
  templateUrl: './domotica-informacion.component.html',
  styleUrls: ['./domotica-informacion.component.scss']
})
export class DomoticaInformacionComponent {
  constructor(
    private router: Router,
    private seoService: SeoService
  ) {
    this.seoService.updateSeo({
      title: 'Qué es la Domótica | Hogar Inteligente en Zaragoza | Civitec Domótica',
      description: 'Descubre qué es la domótica y cómo convertir tu casa en un hogar inteligente en Zaragoza: luces, persianas, climatización, seguridad y ahorro de energía desde el móvil. Sin cuotas.',
      keywords: 'qué es la domótica, hogar inteligente zaragoza, casa inteligente, domótica para el hogar, automatización vivienda zaragoza',
      url: 'https://civitech.es/domotica-informacion'
    });
  }
  urlBoton: string = '/acerca-de-nosotros'
  opiniones = [

    {
      src: '../../../../assets/images/cliente1.jpg',
      nombre: 'Domotización Casa Rural en Monzalbarba (Zaragoza)',
      resenia: 'Nos especializamos en Domotica con enfoque en estilo, funcionalidad y soluciones tecnológicas. '
    },
    {
      src: '../../../../assets/images/cliente3.jpg',
      nombre: 'Monitorización de Consumo Chalet en Montecanal (Zaragoza)',
      resenia: 'Nos especializamos en Domotica con enfoque en estilo, funcionalidad y soluciones tecnológicas. '
    },
    {
      src: '../../../../assets/images/cliente2.jpg',
      nombre: 'Domotización Ático en Centro Zaragoza',
      resenia: 'Nos especializamos en Domotica con enfoque en estilo, funcionalidad y soluciones tecnológicas. '
    }
  ];

  navigate(): void {
    if (this.urlBoton) {
      this.router.navigateByUrl(this.urlBoton);
    } else {
      console.warn('URL de destino no válida');
    }
  }

}
