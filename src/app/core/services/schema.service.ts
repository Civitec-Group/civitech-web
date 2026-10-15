import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface SchemaOrgService {
    '@context': string;
    '@type': string;
    [key: string]: any;
}

@Injectable({
    providedIn: 'root'
})
export class SchemaService {

    constructor(@Inject(DOCUMENT) private document: Document) { }

    /**
     * Schema de la organización Civitec Domótica
     */
    getOrganizationSchema(): SchemaOrgService {
        return {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': 'Civitec Domótica',
            'description': 'Especialistas en domótica profesional en Zaragoza. Automatización del hogar, optimización solar y control inteligente.',
            'url': 'https://civitech.es',
            'telephone': '+34624074920',
            'email': 'info@civitech.es',
            'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'Calle de Nuestra Señora de Covadonga, 39',
                'addressLocality': 'Zaragoza',
                'addressRegion': 'Aragón',
                'postalCode': '50017',
                'addressCountry': 'ES'
            },
            'geo': {
                '@type': 'GeoCoordinates',
                'latitude': 41.6488,
                'longitude': -0.8891
            },
            'areaServed': [
                {
                    '@type': 'City',
                    'name': 'Zaragoza'
                },
                {
                    '@type': 'AdministrativeArea',
                    'name': 'Aragón'
                }
            ],
            'priceRange': '$$',
            'openingHoursSpecification': {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                'opens': '00:00',
                'closes': '23:59'
            },
            'sameAs': [
                'https://www.facebook.com/share/1A3PRQzJHb/',
                'https://www.instagram.com/civitec.domotica',
                'https://www.tiktok.com/@civitech.es',
                'https://www.linkedin.com/company/civitech-es',
                'https://www.youtube.com/@civitec-domotica'
            ],
            'aggregateRating': {
                '@type': 'AggregateRating',
                'ratingValue': '5.0',
                'reviewCount': '5',
                'bestRating': '5',
                'worstRating': '1'
            }
        };
    }

    /**
     * Schema para un caso de uso / servicio de domótica
     */
    getServiceSchema(useCase: any): SchemaOrgService {
        return {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': useCase.titulo,
            'description': useCase.descripcionDetallada || useCase.descripcion,
            'provider': {
                '@type': 'LocalBusiness',
                'name': 'Civitec Domótica'
            },
            'serviceType': `Domótica - ${useCase.categoria}`,
            'areaServed': {
                '@type': 'City',
                'name': 'Zaragoza'
            },
            'offers': {
                '@type': 'Offer',
                'availability': 'https://schema.org/InStock',
                'priceSpecification': {
                    '@type': 'PriceSpecification',
                    'priceCurrency': 'EUR'
                }
            },
            'category': useCase.categoria,
            'potentialAction': {
                '@type': 'OrderAction',
                'target': {
                    '@type': 'EntryPoint',
                    'urlTemplate': 'https://civitech.es/contactanos'
                }
            }
        };
    }

    /**
     * Schema para un proyecto / caso de éxito
     */
    getProjectSchema(proyecto: any): SchemaOrgService {
        return {
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': proyecto.nombre,
            'description': proyecto.resumen,
            'image': proyecto.imagenPrincipal,
            'datePublished': this.convertFechaToISO(proyecto.fecha),
            'author': {
                '@type': 'Organization',
                'name': 'Civitec Domótica'
            },
            'publisher': {
                '@type': 'Organization',
                'name': 'Civitec Domótica',
                'logo': {
                    '@type': 'ImageObject',
                    'url': 'https://civitech.es/assets/images/civitech-logo.png'
                }
            },
            'articleBody': proyecto.descripcionCompleta,
            'about': {
                '@type': 'Thing',
                'name': proyecto.tipo
            },
            'locationCreated': {
                '@type': 'Place',
                'address': {
                    '@type': 'PostalAddress',
                    'addressLocality': proyecto.ubicacion
                }
            }
        };
    }

    /**
     * Schema de un video de YouTube (VideoObject)
     *
     * Sin esto Google no sabe que la pagina tiene video y no lo puede mostrar
     * en resultados. Solo se inserta para videos PUBLICOS: declarar uno privado
     * es una senal rota.
     */
    getVideoSchema(video: {
        id: string,
        titulo: string,
        descripcion: string,
        duracionISO: string,
        subidoISO: string,
        paginaUrl: string
    }): SchemaOrgService {
        return {
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            'name': video.titulo,
            'description': video.descripcion,
            'thumbnailUrl': [
                `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`
            ],
            'uploadDate': video.subidoISO,
            'duration': video.duracionISO,
            'embedUrl': `https://www.youtube.com/embed/${video.id}`,
            'contentUrl': `https://www.youtube.com/watch?v=${video.id}`,
            'url': video.paginaUrl,
            'publisher': {
                '@type': 'Organization',
                'name': 'Civitec Domótica',
                'logo': {
                    '@type': 'ImageObject',
                    'url': 'https://civitech.es/assets/images/civitech-logo.png'
                }
            },
            'inLanguage': 'es-ES',
            'isFamilyFriendly': true,
            'regionsAllowed': 'ES'
        };
    }

    /**
     * Schema de FAQ para use cases
     */
    getFAQSchema(faqs: Array<{ pregunta: string, respuesta: string }>): SchemaOrgService {
        return {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': faqs.map(faq => ({
                '@type': 'Question',
                'name': faq.pregunta,
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': faq.respuesta
                }
            }))
        };
    }

    /**
     * Schema de Breadcrumb
     */
    getBreadcrumbSchema(items: Array<{ name: string, url: string }>): SchemaOrgService {
        return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': items.map((item, index) => ({
                '@type': 'ListItem',
                'position': index + 1,
                'name': item.name,
                'item': item.url
            }))
        };
    }

    /**
     * Insertar schema en el head del documento
     */
    insertSchema(schema: SchemaOrgService, id?: string): void {
        const scriptId = id || `schema-${schema['@type']}`;

        // Remover script previo si existe
        const existing = this.document.getElementById(scriptId);
        if (existing) {
            existing.remove();
        }

        // Crear nuevo script
        const script = this.document.createElement('script');
        script.type = 'application/ld+json';
        script.id = scriptId;
        script.text = JSON.stringify(schema);
        this.document.head.appendChild(script);
    }

    /**
     * Remover schema del head
     */
    removeSchema(id: string): void {
        const existing = this.document.getElementById(id);
        if (existing) {
            existing.remove();
        }
    }

    /**
     * Helper: Convertir fecha española a ISO
     */
    private convertFechaToISO(fecha: string): string {
        // Convertir "Junio 2023" a "2023-06-01"
        const meses: { [key: string]: string } = {
            'enero': '01', 'febrero': '02', 'marzo': '03',
            'abril': '04', 'mayo': '05', 'junio': '06',
            'julio': '07', 'agosto': '08', 'septiembre': '09',
            'octubre': '10', 'noviembre': '11', 'diciembre': '12'
        };

        const parts = fecha.toLowerCase().split(' ');
        if (parts.length === 2) {
            const mes = meses[parts[0]] || '01';
            const año = parts[1];
            return `${año}-${mes}-01`;
        }

        return new Date().toISOString();
    }
}
