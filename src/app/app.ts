import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, skip } from 'rxjs';

import { FooterComponent } from './layout/footer.component';
import { GalaxyBackgroundComponent } from './layout/galaxy-background.component';
import { NavComponent } from './layout/nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GalaxyBackgroundComponent, NavComponent, FooterComponent],
  host: { class: 'flex min-h-dvh flex-col' },
  template: `
    <a class="skip-link" href="#contenido" (click)="skipToContent($event)">Saltar al contenido</a>
    <app-galaxy-background />
    <app-nav />
    <main #main id="contenido" tabindex="-1" class="min-h-svh flex-1">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class App {
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  constructor() {
    // Al cambiar de página el foco pasa al contenido; las anclas dentro de la home no lo mueven.
    inject(Router)
      .events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        skip(1),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        if (!event.urlAfterRedirects.includes('#')) {
          this.main().nativeElement.focus({ preventScroll: true });
        }
      });
  }

  protected skipToContent(event: Event): void {
    event.preventDefault();
    this.main().nativeElement.focus();
  }
}
