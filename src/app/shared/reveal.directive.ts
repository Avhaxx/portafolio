import { DestroyRef, Directive, ElementRef, afterNextRender, computed, inject, input } from '@angular/core';

/**
 * Revela el elemento una sola vez cuando entra en pantalla.
 * Uso: `<div appReveal>` o `<div [appReveal]="120">` (retraso en ms).
 * Con `prefers-reduced-motion` o sin IntersectionObserver aparece de inmediato.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[style.--reveal-delay]': 'delayValue()',
  },
})
export class RevealDirective {
  readonly delay = input<number | string>(0, { alias: 'appReveal' });
  protected readonly delayValue = computed(() => `${Number(this.delay()) || 0}ms`);

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion || typeof IntersectionObserver === 'undefined') {
        element.classList.add('is-revealed');
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            element.classList.add('is-revealed');
            observer.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      );
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
