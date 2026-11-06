import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealDirective } from './reveal.directive';

@Component({
  imports: [RevealDirective],
  template: `
    <div id="sin-retraso" appReveal>a</div>
    <div id="con-retraso" [appReveal]="150">b</div>
  `,
})
class HostComponent {}

function mockReducedMotion(reduce: boolean): void {
  spyOn(window, 'matchMedia').and.callFake(
    (query: string) => ({ matches: reduce && query.includes('reduce'), media: query }) as MediaQueryList,
  );
}

describe('RevealDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  const el = (id: string): HTMLElement => fixture.nativeElement.querySelector(`#${id}`);

  function create(): void {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  }

  it('marca el elemento con la clase base y el retraso en ms', () => {
    mockReducedMotion(false);
    create();
    expect(el('sin-retraso').classList).toContain('reveal');
    expect(el('sin-retraso').style.getPropertyValue('--reveal-delay')).toBe('0ms');
    expect(el('con-retraso').style.getPropertyValue('--reveal-delay')).toBe('150ms');
  });

  it('con movimiento reducido aparece de inmediato', () => {
    mockReducedMotion(true);
    create();
    expect(el('sin-retraso').classList).toContain('is-revealed');
  });

  it('con movimiento normal se revela al entrar en pantalla', async () => {
    mockReducedMotion(false);
    create();
    document.body.appendChild(fixture.nativeElement);
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(el('sin-retraso').classList).toContain('is-revealed');
    fixture.nativeElement.remove();
  });
});
