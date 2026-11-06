import { Component, inject } from '@angular/core';

import { MotionService } from '../core/motion.service';
import { PROFILE } from '../data/profile';
import { IconComponent } from '../shared/icon.component';

@Component({
  selector: 'app-footer',
  imports: [IconComponent],
  template: `
    <footer class="border-t border-line">
      <div class="container-page flex flex-col gap-4 py-8 text-sm text-ink-3 md:flex-row md:items-center md:justify-between">
        <p class="mono text-xs">© {{ year }} {{ name }} · Hecho con Angular y Tailwind CSS</p>
        <div class="flex flex-wrap items-center gap-x-6">
          <button
            type="button"
            class="inline-flex min-h-11 items-center gap-2 text-ink-2 transition-colors hover:text-ink"
            [attr.aria-pressed]="motion.paused()"
            (click)="motion.toggle()"
          >
            {{ motion.paused() ? 'Reanudar animaciones' : 'Pausar animaciones' }}
          </button>
          <button
            type="button"
            class="inline-flex min-h-11 items-center gap-2 text-ink-2 transition-colors hover:text-ink"
            (click)="scrollToTop()"
          >
            Volver arriba <app-icon name="arrow-up" />
          </button>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly motion = inject(MotionService);
  protected readonly year = new Date().getFullYear();
  protected readonly name = PROFILE.name;

  protected scrollToTop(): void {
    window.scrollTo({ top: 0 });
  }
}
