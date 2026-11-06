import { DOCUMENT } from '@angular/common';
import { Injectable, afterNextRender, effect, inject, signal } from '@angular/core';

/**
 * Preferencia de movimiento del sitio.
 * Se pausa sola si la persona pidió menos movimiento o ahorro de datos, y puede
 * pausarse o reanudarse a mano (WCAG 2.2.2). Marca `<html data-motion="paused">`
 * para que los estilos detengan las animaciones decorativas.
 *
 * La preferencia se lee después del primer render, en el navegador: así el HTML
 * prerenderizado y el primer render del cliente coinciden.
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly document = inject(DOCUMENT);
  private readonly state = signal(false);

  /** `true` cuando las animaciones decorativas están detenidas. */
  readonly paused = this.state.asReadonly();

  constructor() {
    effect(() => {
      this.document.documentElement.setAttribute('data-motion', this.state() ? 'paused' : 'running');
    });

    afterNextRender(() => {
      this.state.set(MotionService.prefersLess());

      const query = window.matchMedia('(prefers-reduced-motion: reduce)');
      query.addEventListener?.('change', (event) => {
        if (event.matches) {
          this.state.set(true);
        }
      });
    });
  }

  toggle(): void {
    this.state.update((value) => !value);
  }

  private static prefersLess(): boolean {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    return reduceMotion || connection?.saveData === true;
  }
}
