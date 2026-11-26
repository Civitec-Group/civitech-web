import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from './core/services/seo.service';
import { AnalyticsService } from './core/services/analytics.service';
import { OrigenService } from './core/services/origen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Civitech.Web';
  isBrowser: boolean;

  urlPrincipal: string = '/../../../../assets/images/contact_3.jpg';

  constructor(
    private seoService: SeoService,
    private analyticsService: AnalyticsService,
    private origenService: OrigenService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // La ficha de empresa (LocalBusiness) va estática en index.html: no se inyecta otra.

    // Browser-only initializations
    if (isPlatformBrowser(this.platformId)) {
      // Origen del lead: se guarda en la pagina de entrada (utm, referrer...). Ver origen.service.ts
      this.origenService.capturar();

      // Initialize Google Analytics
      this.analyticsService.init('G-45C2R9F4RE');

      // Initialize Animate on Scroll
      import('aos').then(AOS => {
        AOS.init({
          duration: 800,
          easing: 'ease-out-quad',
          once: true,
          mirror: false
        });
      });
    }
  }
}
