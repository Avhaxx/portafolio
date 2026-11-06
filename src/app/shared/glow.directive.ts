import { Directive, ElementRef, inject } from '@angular/core';

/** Brillo en el borde que sigue al cursor. Solo con ratón; en táctil no hace nada. */
@Directive({
  selector: '[appGlow]',
  host: {
    class: 'glow',
    '(pointermove)': 'onMove($event)',
  },
})
export class GlowDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected onMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') {
      return;
    }
    const rect = this.element.getBoundingClientRect();
    this.element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    this.element.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
