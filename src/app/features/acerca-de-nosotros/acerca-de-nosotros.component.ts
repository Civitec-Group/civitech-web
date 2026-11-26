import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { ProyectosService } from '../../core/services/proyectos.service';
import { Proyecto } from '../../core/models/proyecto.model';

@Component({
  selector: 'app-acerca-de-nosotros',
  templateUrl: './acerca-de-nosotros.component.html',
  styleUrls: ['./acerca-de-nosotros.component.scss']
})
export class AcercaDeNosotrosComponent implements OnInit {

  // Proyectos reales destacados en la home. Tira del mismo ProyectosService,
  // así al añadir proyectos nuevos la home se actualiza sola.
  proyectosDestacados: Proyecto[] = [];

  constructor(private seoService: SeoService, private proyectosService: ProyectosService) { }

  ngOnInit(): void {
    this.proyectosDestacados = this.proyectosService.getProyectos().slice(0, 3);
  }

  // Testimonios retirados (eran inventados). Solo reseñas REALES de Google. Rellenar cuando existan.
  opiniones: { src: string; nombre: string; resenia: string }[] = [];


}
