import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GlowDirective } from './glow.directive';

@Component({ imports: [GlowDirective], template: `<div appGlow style="width:200px;height:100px">x</div>` })
class HostComponent {}

describe('GlowDirective', () => {
  function setup(): HTMLElement {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('div');
  }

  it('añade la clase glow', () => {
    expect(setup().classList).toContain('glow');
  });

  it('con ratón guarda la posición del cursor', () => {
    const element = setup();
    document.body.appendChild(element);
    const rect = element.getBoundingClientRect();
    element.dispatchEvent(
      new PointerEvent('pointermove', { pointerType: 'mouse', clientX: rect.left + 40, clientY: rect.top + 25 }),
    );
    expect(element.style.getPropertyValue('--mx')).toBe('40px');
    expect(element.style.getPropertyValue('--my')).toBe('25px');
    element.remove();
  });

  it('con un dedo (táctil) no hace nada', () => {
    const element = setup();
    element.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'touch', clientX: 10, clientY: 10 }));
    expect(element.style.getPropertyValue('--mx')).toBe('');
  });
});
