import { TestBed } from '@angular/core/testing';

import { PROJECTS } from '../../data/projects';
import { ProjectCardComponent } from './project-card.component';

describe('ProjectCardComponent', () => {
  function create(projectIndex: number): HTMLElement {
    const fixture = TestBed.createComponent(ProjectCardComponent);
    fixture.componentRef.setInput('project', PROJECTS[projectIndex]);
    fixture.componentRef.setInput('index', `0${projectIndex + 1}`);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('muestra nombre, resumen, lo que se hizo y las tecnologías', () => {
    const root = create(0);
    const project = PROJECTS[0];
    expect(root.querySelector('h3')?.textContent).toContain(project.name);
    expect(root.textContent).toContain(project.summary);
    expect(root.querySelectorAll('ul')[0].querySelectorAll('li').length).toBe(project.did.length);
    expect(root.querySelectorAll('ul')[1].querySelectorAll('li').length).toBe(project.stack.length);
  });

  it('avisa que el código es privado', () => {
    expect(create(1).textContent).toContain('Código privado');
  });

  it('no muestra enlaces si el proyecto no los tiene', () => {
    expect(create(0).querySelectorAll('a').length).toBe(0);
  });

  it('muestra el enlace de ADN y lo abre de forma segura', () => {
    const link = create(2).querySelector('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('https://adnmedic.com/');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
  });

  it('el número decorativo no se anuncia a los lectores de pantalla', () => {
    expect(create(0).querySelector('.numeral')?.getAttribute('aria-hidden')).toBe('true');
  });
});
