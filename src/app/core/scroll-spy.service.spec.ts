import { TestBed } from '@angular/core/testing';

import { ScrollSpy } from './scroll-spy.service';

describe('ScrollSpy', () => {
  let spy: ScrollSpy;

  beforeEach(() => {
    spy = TestBed.inject(ScrollSpy);
  });

  afterEach(() => spy.disconnect());

  it('empieza sin sección activa', () => {
    expect(spy.active()).toBeNull();
  });

  it('ignora ids que no existen en el documento', () => {
    expect(() => spy.observe(['no-existe-1', 'no-existe-2'])).not.toThrow();
    expect(spy.active()).toBeNull();
  });

  it('marca como activa la sección que cruza el centro de la pantalla', async () => {
    const section = document.createElement('section');
    section.id = 'seccion-prueba';
    section.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh';
    document.body.appendChild(section);

    spy.observe(['seccion-prueba']);
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(spy.active()).toBe('seccion-prueba');

    section.remove();
  });

  it('disconnect limpia la sección activa', () => {
    spy.observe([]);
    spy.disconnect();
    expect(spy.active()).toBeNull();
  });
});
