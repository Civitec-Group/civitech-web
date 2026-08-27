import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface SeoConfig {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
}

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    private baseUrl = 'https://civitech.es';
    private defaultImage = `${this.baseUrl}/assets/images/logo_civitec_domotica.png`;
    private isBrowser: boolean;

    constructor(
        private titleService: Title,
        private metaService: Meta,
        private router: Router,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        // Ejecutar SEO sincrónicamente al construir — necesario para SSR/prerender
        // (NavigationEnd no se dispara en prerender, solo en browser)
        this.updateSeoForCurrentRoute();
        // En browser, también escuchar cambios de ruta
        if (this.isBrowser) {
            this.setupRouteListener();
        }
    }

    private setupRouteListener(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.updateSeoForCurrentRoute();
            });
    }

    private updateSeoForCurrentRoute(): void {
        const currentUrl = this.router.url;
        const config = this.getSeoConfigForRoute(currentUrl);
        this.updateSeo(config);
    }

    private getSeoConfigForRoute(url: string): SeoConfig {
        const configs: { [key: string]: SeoConfig } = {
            '/': {
                title: 'Civitec Domótica Zaragoza · Instalación sin obras',
                description: 'Empresa líder en domótica en Zaragoza. Instalación sin obras, sistemas abiertos, control centralizado. Presupuesto gratis en 24h.',
                keywords: 'domotica zaragoza, empresa domotica zaragoza, instalador domotica zaragoza, casa inteligente zaragoza, civitech',
                url: this.baseUrl,
                image: `${this.baseUrl}/assets/images/home.jpg`
            },
            '/acerca-de-nosotros': {
                title: 'Sobre Civitec Domótica Zaragoza · Nuestro equipo',
                description: 'Conoce a Civitec Domótica: equipo de instaladores en Zaragoza, sistemas abiertos y sin cuotas. Cientos de instalaciones desde 2024.',
                keywords: 'sobre civitech domotica, equipo civitec zaragoza, empresa domotica zaragoza, civitech quienes somos',
                url: `${this.baseUrl}/acerca-de-nosotros`,
                image: `${this.baseUrl}/assets/images/home.jpg`
            },
            '/domotica-informacion': {
                title: 'Qué es la domótica y qué ahorra · Civitec Zaragoza',
                description: 'Cómo la domótica transforma tu hogar en Zaragoza: ahorro energético, seguridad y confort. Instaladores sin obras. Pide presupuesto.',
                keywords: 'domotica zaragoza, instalaciones domotica zaragoza, smart home zaragoza, automatizacion vivienda zaragoza',
                url: `${this.baseUrl}/domotica-informacion`,
                image: `${this.baseUrl}/assets/images/smart_home_control.png`
            },
            '/proyectos': {
                title: 'Casos de éxito domótica Zaragoza · Civitec',
                description: 'Proyectos reales de domótica en Zaragoza: pisos, chalets, locales y oficinas con Home Assistant y Shelly. Casos de éxito.',
                keywords: 'proyectos domótica zaragoza, instalaciones domótica zaragoza, casos domótica, domótica zaragoza',
                url: `${this.baseUrl}/proyectos`,
                image: `${this.baseUrl}/assets/images/proyecto1.png`
            },
            '/contactanos': {
                title: 'Contacto · Presupuesto domótica Zaragoza 24h',
                description: 'Solicita tu presupuesto gratuito de domótica en Zaragoza en 24h. Llama al 624 074 920 o escríbenos. Instalación sin obras.',
                keywords: 'presupuesto domótica zaragoza, contacto civitech, instalación domótica precio, consulta gratis',
                url: `${this.baseUrl}/contactanos`,
                image: `${this.baseUrl}/assets/images/contacto.jpg`
            },
            '/instaladores': {
                title: 'Programa Partners para instaladores · Civitec',
                description: 'Red de partners de Civitec Domótica: ofrece domótica en tus reformas sin complicaciones. Aumenta tu ticket medio.',
                keywords: 'partners domótica, instaladores domótica zaragoza, colaboración reformas zaragoza, civitech partners',
                url: `${this.baseUrl}/instaladores`,
                image: `${this.baseUrl}/assets/images/partnership_collaboration.png`
            },
            '/empresas': {
                title: 'Domótica para empresas en Zaragoza · Civitec',
                description: 'Domótica para negocios en Zaragoza: lavanderías, gimnasios, oficinas, clínicas. Control móvil, sin cuotas. Presupuesto gratis en 24h.',
                keywords: 'domótica empresas zaragoza, automatización negocios zaragoza, control acceso empresas, cámaras vigilancia sin cuotas, ahorro energético negocios, domótica hostelería, domótica lavanderías, domótica oficinas, domótica zaragoza b2b, civitech empresas',
                url: `${this.baseUrl}/empresas`,
                image: `${this.baseUrl}/assets/images/usecase-business.png`
            },
            '/empresas/lavanderias': {
                title: 'Domótica para lavanderías · Civitec Zaragoza',
                description: 'Domótica para lavanderías en Zaragoza: control de secadoras, medición de consumos y aperturas remotas. Sin cuotas.',
                keywords: 'domotica lavanderias zaragoza, control lavanderia, automatizacion lavanderia autoservicio, civitech empresas',
                url: `${this.baseUrl}/empresas/lavanderias`,
                image: `${this.baseUrl}/assets/images/usecase-business.png`
            },
            '/empresas/gimnasios': {
                title: 'Domótica para gimnasios · Civitec Zaragoza',
                description: 'Domótica para gimnasios en Zaragoza: control de aforo, iluminación por zonas, climatización eficiente. Sin cuotas.',
                keywords: 'domotica gimnasios zaragoza, control gimnasio, automatizacion gimnasio, civitech empresas',
                url: `${this.baseUrl}/empresas/gimnasios`,
                image: `${this.baseUrl}/assets/images/usecase-business.png`
            },
            '/empresas/clinicas': {
                title: 'Domótica para clínicas · Civitec Zaragoza',
                description: 'Domótica para clínicas en Zaragoza: control de accesos, climatización por consulta, seguridad. Sin cuotas.',
                keywords: 'domotica clinicas zaragoza, control clinica, automatizacion clinica dental, civitech empresas',
                url: `${this.baseUrl}/empresas/clinicas`,
                image: `${this.baseUrl}/assets/images/usecase-business.png`
            },
            '/empresas/comercio': {
                title: 'Domótica para comercios · Civitec Zaragoza',
                description: 'Domótica para comercios en Zaragoza: control iluminación, escaparate programado, alarmas conectadas. Sin cuotas.',
                keywords: 'domotica comercios zaragoza, tienda inteligente, automatizacion comercio, civitech empresas',
                url: `${this.baseUrl}/empresas/comercio`,
                image: `${this.baseUrl}/assets/images/usecase-business.png`
            },
            '/empresas/hoteles': {
                title: 'Domótica para hoteles · Civitec Zaragoza',
                description: 'Domótica para hoteles y apartamentos en Zaragoza: check-in remoto, climatización por habitación, ahorro energético.',
                keywords: 'domotica hoteles zaragoza, apartamentos turisticos automatizacion, hotel inteligente, civitech empresas',
                url: `${this.baseUrl}/empresas/hoteles`,
                image: `${this.baseUrl}/assets/images/usecase-business.png`
            }
        };

        return configs[url] || {
            title: 'Civitec Domótica Zaragoza · Casas inteligentes',
            description: 'Empresa de domótica en Zaragoza. Instalación sin obras, sistemas abiertos, control centralizado. Presupuesto gratis en 24h.',
            keywords: 'domotica zaragoza, instalaciones domotica zaragoza, automatizacion, smart home, civitech',
            url: `${this.baseUrl}${url}`
        };
    }

    updateSeo(config: SeoConfig): void {
        // Update title
        this.titleService.setTitle(config.title);

        // Update standard meta tags
        this.metaService.updateTag({ name: 'description', content: config.description });
        this.metaService.updateTag({ name: 'keywords', content: config.keywords || '' });
        this.metaService.updateTag({ name: 'author', content: 'Civitec Domótica' });
        this.metaService.updateTag({ name: 'robots', content: 'index, follow' });

        // Open Graph (Facebook, LinkedIn)
        this.metaService.updateTag({ property: 'og:type', content: 'website' });
        this.metaService.updateTag({ property: 'og:site_name', content: 'Civitec Domótica' });
        this.metaService.updateTag({ property: 'og:title', content: config.title });
        this.metaService.updateTag({ property: 'og:description', content: config.description });
        this.metaService.updateTag({ property: 'og:image', content: config.image || this.defaultImage });
        this.metaService.updateTag({ property: 'og:url', content: config.url || this.baseUrl });
        this.metaService.updateTag({ property: 'og:locale', content: 'es_ES' });

        // Twitter Card
        this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.metaService.updateTag({ name: 'twitter:title', content: config.title });
        this.metaService.updateTag({ name: 'twitter:description', content: config.description });
        this.metaService.updateTag({ name: 'twitter:image', content: config.image || this.defaultImage });

        // Geo tags for local SEO
        this.metaService.updateTag({ name: 'geo.region', content: 'ES-Z' });
        this.metaService.updateTag({ name: 'geo.placename', content: 'Zaragoza' });
        this.metaService.updateTag({ name: 'geo.position', content: '41.648823;-0.889085' });
        this.metaService.updateTag({ name: 'ICBM', content: '41.648823, -0.889085' });

        // Add canonical URL
        this.updateCanonicalUrl(config.url || this.baseUrl);
    }

    private updateCanonicalUrl(url: string): void {
        let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');

        if (!link) {
            link = this.document.createElement('link');
            link.setAttribute('rel', 'canonical');
            this.document.head.appendChild(link);
        }

        link.setAttribute('href', url);
    }

    setRobotsTag(content: string): void {
        this.metaService.updateTag({ name: 'robots', content });
    }

    addStructuredData(data: any, id: string = 'schema-main'): void {
        const existingScript = this.document.getElementById(id);
        if (existingScript) {
            existingScript.remove();
        }

        const script = this.document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);
        this.document.head.appendChild(script);
    }

    removeStructuredData(id: string): void {
        const script = this.document.getElementById(id);
        if (script) {
            script.remove();
        }
    }

    addLocalBusinessSchema(): void {
        const localBusiness = {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': 'https://civitech.es',
            name: 'Civitec Domótica',
            description: 'Civitec Domótica: Empresa líder en domótica en Zaragoza. Instalación sin obras y control centralizado.',
            image: `${this.baseUrl}/assets/images/logo_civitec_domotica.png`,
            url: this.baseUrl,
            telephone: '+34624074920',
            email: 'info@civitech.es',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Calle de Nuestra Señora de Covadonga, 39',
                addressLocality: 'Zaragoza',
                addressRegion: 'Aragón',
                postalCode: '50017',
                addressCountry: 'ES'
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: 41.648823,
                longitude: -0.889085
            },
            areaServed: {
                '@type': 'City',
                name: 'Zaragoza'
            },
            openingHoursSpecification: [
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    opens: '00:00',
                    closes: '23:59'
                }
            ],
            sameAs: [
                'https://www.facebook.com/share/1A3PRQzJHb/',
                'https://www.instagram.com/civitech.es',
                'https://www.tiktok.com/@civitech.es',
                'https://www.linkedin.com/company/civitech-es'
            ]
        };

        this.addStructuredData(localBusiness);
    }
}
