import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';

describe('App', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('monta la estructura del sitio', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;

    expect(root.querySelector('app-galaxy-background')).not.toBeNull();
    expect(root.querySelector('app-nav')).not.toBeNull();
    expect(root.querySelector('main#contenido')).not.toBeNull();
    expect(root.querySelector('app-footer')).not.toBeNull();
  });

  it('el enlace "Saltar al contenido" mueve el foco al contenido principal', () => {
    const fixture = TestBed.createComponent(App);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();

    const skip = fixture.nativeElement.querySelector('.skip-link') as HTMLAnchorElement;
    skip.click();

    expect(document.activeElement?.id).toBe('contenido');
    fixture.nativeElement.remove();
  });
});
