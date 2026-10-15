import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectosService } from '../../core/services/proyectos.service';
import { Proyecto } from '../../core/models/proyecto.model';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {
  urlBoton: string = '/acerca-de-nosotros';
  proyectos: Proyecto[] = [];

  constructor(
    private router: Router,
    private proyectosService: ProyectosService,
    private seo: SeoService
  ) { }

  ngOnInit(): void {
    this.proyectos = this.proyectosService.getProyectos();
    this.seo.updateSeo({
      title: 'Proyectos de Domótica en Zaragoza | Casos Reales | Civitec Domótica',
      description: 'Casos reales de domótica y automatización en Zaragoza: viviendas, chalets, locales y negocios con Home Assistant y control total desde el móvil. Sin cuotas. Pide presupuesto gratis.',
      keywords: 'proyectos domótica zaragoza, casos domótica, instalaciones home assistant zaragoza, domótica viviendas, domótica negocios zaragoza',
      url: 'https://civitech.es/proyectos'
    });
  }

  navigate(): void {
    if (this.urlBoton) {
      this.router.navigateByUrl(this.urlBoton);
    } else {
      console.warn('URL de destino no válida');
    }
  }

  verDetalle(proyecto: Proyecto): void {
    if (proyecto && proyecto.slug) {
      this.router.navigate(['/proyectos', proyecto.slug]);
    }
  }
}
