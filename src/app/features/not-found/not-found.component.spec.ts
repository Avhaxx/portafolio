import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  it('explica el error y ofrece volver al inicio', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;

    expect(root.querySelector('h1')?.textContent).toContain('se perdió');
    expect(root.textContent).toContain('Error 404');
    expect(root.querySelector('a[href="/"]')).not.toBeNull();
  });

  it('pide a los buscadores no indexarla y retira la marca al salir', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex');

    fixture.destroy();
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
  });
});
