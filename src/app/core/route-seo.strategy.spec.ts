import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, TitleStrategy, provideRouter } from '@angular/router';

import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, RouteSeoStrategy } from './route-seo.strategy';

@Component({ template: '' })
class DummyComponent {}

function metaContent(selector: string): string | null {
  return document.head.querySelector(selector)?.getAttribute('content') ?? null;
}

describe('RouteSeoStrategy', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'con-datos', title: 'Con datos', data: { description: 'Descripción propia' }, component: DummyComponent },
          { path: 'sin-datos', title: 'Sin datos', component: DummyComponent },
          { path: 'sin-titulo', component: DummyComponent },
        ]),
        { provide: TitleStrategy, useClass: RouteSeoStrategy },
      ],
    });
    router = TestBed.inject(Router);
  });

  it('usa el título y la descripción de la ruta', async () => {
    await router.navigateByUrl('/con-datos');
    expect(document.title).toBe('Con datos');
    expect(metaContent('meta[name="description"]')).toBe('Descripción propia');
    expect(metaContent('meta[property="og:title"]')).toBe('Con datos');
  });

  it('cae a la descripción por defecto si no hay datos', async () => {
    await router.navigateByUrl('/sin-datos');
    expect(metaContent('meta[name="description"]')).toBe(DEFAULT_DESCRIPTION);
  });

  it('cae al título por defecto si la ruta no tiene título', async () => {
    await router.navigateByUrl('/sin-titulo');
    expect(document.title).toBe(DEFAULT_TITLE);
  });
});
