import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NAV_LINKS } from '../../data/nav';
import { PROJECTS } from '../../data/projects';
import { PROFILE } from '../../data/profile';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  function create(): HTMLElement {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('tiene un único h1 con el mensaje principal', () => {
    const root = create();
    const headings = root.querySelectorAll('h1');
    expect(headings.length).toBe(1);
    expect(headings[0].textContent).toContain('operaciones reales');
  });

  it('cada enlace del menú apunta a una sección que existe', () => {
    const root = create();
    for (const link of NAV_LINKS) {
      expect(root.querySelector(`section#${link.id}`)).withContext(link.id).not.toBeNull();
    }
  });

  it('muestra una tarjeta por proyecto', () => {
    const root = create();
    const cards = root.querySelectorAll('app-project-card');
    expect(cards.length).toBe(PROJECTS.length);
    for (const project of PROJECTS) {
      expect(root.textContent).withContext(project.name).toContain(project.name);
    }
  });

  it('presenta la experiencia como un año de trabajo profesional', () => {
    const root = create();
    expect(root.textContent).toContain('1 año en producción');
    expect(root.textContent).toContain('llevo un año haciendo software profesional');
  });

  it('los enlaces externos se abren de forma segura', () => {
    const root = create();
    const external = root.querySelectorAll('a[target="_blank"]');
    expect(external.length).toBeGreaterThan(0);
    for (const anchor of Array.from(external)) {
      expect(anchor.getAttribute('rel')).toContain('noopener');
    }
  });

  it('incluye el perfil de LinkedIn y GitHub', () => {
    const root = create();
    expect(root.querySelector(`a[href="${PROFILE.linkedin}"]`)).not.toBeNull();
    expect(root.querySelector(`a[href="${PROFILE.github}"]`)).not.toBeNull();
  });
});
