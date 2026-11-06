import { TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  it('muestra el año actual y el nombre', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain(String(new Date().getFullYear()));
    expect(text).toContain('Antonio López');
  });

  it('el botón de animaciones pausa y reanuda, y comunica su estado', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const before = button.getAttribute('aria-pressed');

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-pressed')).not.toBe(before);
    expect(button.textContent).toMatch(/Pausar|Reanudar/);
  });

  it('"Volver arriba" lleva al inicio de la página', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const scrollTo = spyOn(window, 'scrollTo') as jasmine.Spy;
    const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    buttons[buttons.length - 1].click();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0 });
  });
});
