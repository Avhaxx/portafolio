import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NAV_LINKS } from '../data/nav';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let fixture: ComponentFixture<NavComponent>;
  let root: HTMLElement;

  const toggle = (): HTMLButtonElement => root.querySelector('button[aria-controls="menu-movil"]')!;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
    root = fixture.nativeElement;
  });

  it('muestra un enlace por cada sección', () => {
    const links = root.querySelectorAll('ul a.nav-link');
    expect(links.length).toBe(NAV_LINKS.length);
    expect(links[0].textContent?.trim()).toBe(NAV_LINKS[0].label);
  });

  it('tiene la navegación principal etiquetada', () => {
    expect(root.querySelector('nav')?.getAttribute('aria-label')).toBe('Principal');
  });

  it('el menú móvil empieza cerrado y se abre con el botón', () => {
    expect(toggle().getAttribute('aria-expanded')).toBe('false');
    expect(root.querySelector('#menu-movil')).toBeNull();

    toggle().click();
    fixture.detectChanges();

    expect(toggle().getAttribute('aria-expanded')).toBe('true');
    expect(toggle().getAttribute('aria-label')).toBe('Cerrar menú');
    expect(root.querySelectorAll('#menu-movil a.sheet-link').length).toBe(NAV_LINKS.length);
  });

  it('Escape cierra el menú móvil y devuelve el foco al botón', () => {
    document.body.appendChild(root);
    toggle().click();
    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(root.querySelector('#menu-movil')).toBeNull();
    expect(toggle().getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle());
    root.remove();
  });

  it('pulsar un enlace del menú móvil lo cierra, incluso si ya es la sección activa', () => {
    toggle().click();
    fixture.detectChanges();

    (root.querySelector('#menu-movil a.sheet-link') as HTMLAnchorElement).click();
    fixture.detectChanges();

    expect(root.querySelector('#menu-movil')).toBeNull();
  });

  it('Escape con el menú cerrado no rompe nada', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(root.querySelector('#menu-movil')).toBeNull();
  });
});
