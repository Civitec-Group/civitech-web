import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UseCase } from '../../core/models/use-case.model';
import { UseCasesService } from '../../core/services/use-cases.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { SchemaService } from 'src/app/core/services/schema.service';
import { VIDEOS, VIDEO_POR_USECASE, VideoDato } from 'src/app/core/data/videos.data';

@Component({
  selector: 'app-use-case-detalle',
  templateUrl: './use-case-detalle.component.html',
  styleUrls: ['./use-case-detalle.component.scss']
})
export class UseCaseDetalleComponent implements OnInit, OnDestroy {
  useCase?: UseCase;
  faqExpandido: { [key: number]: boolean } = {};
  videos: { dato: VideoDato, embedUrl: SafeResourceUrl }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private useCasesService: UseCasesService,
    private seoService: SeoService,
    private schemaService: SchemaService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.useCase = this.useCasesService.getUseCaseBySlug(slug);
      if (!this.useCase) {
        this.router.navigate(['/domotica-informacion']);
      } else {
        this.updateMetaTags();
        this.addSchemaMarkup();
        this.addVideoIfAny(slug);
      }
    }
  }

  // Solo videos PUBLICOS: embebido + VideoObject (uno o varios). Datos en videos.data.ts
  private addVideoIfAny(slug: string): void {
    const claves = VIDEO_POR_USECASE[slug] || [];
    this.videos = claves
      .map(c => VIDEOS[c])
      .filter(Boolean)
      .map(dato => ({
        dato,
        embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${dato.id}`)
      }));
    this.videos.forEach((v, i) => {
      this.seoService.addStructuredData(
        this.schemaService.getVideoSchema({
          id: v.dato.id,
          titulo: v.dato.titulo,
          descripcion: v.dato.descripcion,
          duracionISO: v.dato.duracionISO,
          subidoISO: v.dato.subidoISO,
          paginaUrl: `https://civitech.es${this.router.url}`
        }),
        `schema-video-detail-${i}`
      );
    });
  }

  ngOnDestroy(): void {
    this.videos.forEach((_, i) => this.seoService.removeStructuredData(`schema-video-detail-${i}`));
  }

  // Update SEO using the centralized service
  updateMetaTags(): void {
    if (!this.useCase) return;

    // Clean description to avoid double dots
    const cleanDesc = this.useCase.descripcion.trim().endsWith('.')
      ? this.useCase.descripcion.trim().slice(0, -1)
      : this.useCase.descripcion.trim();

    const savingSuffix = this.useCase.ahorroEstimado
      ? `. Ahorra hasta ${this.useCase.ahorroEstimado}`
      : '';

    // Handle technologies and categories for keywords
    const techWords = this.useCase.tecnologias?.length
      ? `, ${this.useCase.tecnologias.map(t => t.nombre).join(', ')}`
      : '';

    this.seoService.updateSeo({
      title: `${this.useCase.seoTitle || this.useCase.titulo} | Domótica Zaragoza | Civitec Domótica`,
      description: `${cleanDesc}${savingSuffix}. Instalación profesional en Zaragoza.`,
      keywords: this.useCase.seoKeywords || `${this.useCase.titulo}, domótica ${this.useCase.categoria}${techWords}, Zaragoza, Aragón`,
      image: this.useCase.imagen,
      url: `https://civitech.es${this.router.url}`
    });
  }

  addSchemaMarkup(): void {
    if (!this.useCase) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": this.useCase.titulo,
      "description": this.useCase.descripcionDetallada,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Civitec Domótica",
        "telephone": "+34-624-074-920",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Zaragoza",
          "addressRegion": "Aragón",
          "addressCountry": "ES"
        }
      },
      "areaServed": {
        "@type": "Place",
        "name": "Aragón, España"
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock"
      }
    };

    this.seoService.addStructuredData(schema, 'schema-service-detail');
  }

  volver(): void {
    this.router.navigate(['/domotica-informacion']);
  }

  contactar(): void {
    this.router.navigate(['/contactanos']);
  }

  toggleFaq(index: number): void {
    this.faqExpandido[index] = !this.faqExpandido[index];
  }
}
