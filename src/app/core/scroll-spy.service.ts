import { Injectable, signal } from '@angular/core';

/** Marca qué sección de la home está en el centro de la pantalla. */
@Injectable({ providedIn: 'root' })
export class ScrollSpy {
  private readonly current = signal<string | null>(null);
  readonly active = this.current.asReadonly();

  private observer?: IntersectionObserver;

  observe(sectionIds: readonly string[]): void {
    this.disconnect();
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        // Primero las que salen y luego las que entran, para que gane la sección actual.
        for (const entry of entries) {
          if (!entry.isIntersecting && this.current() === entry.target.id) {
            this.current.set(null);
          }
        }
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.current.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        this.observer.observe(element);
      }
    }
  }

  disconnect(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    this.current.set(null);
  }
}
