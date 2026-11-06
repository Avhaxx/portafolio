import { OTHER_WORK, PROJECTS } from './projects';

describe('datos de proyectos', () => {
  it('hay tres proyectos destacados con nombres únicos', () => {
    const names = PROJECTS.map((project) => project.name);
    expect(names).toEqual(['Lecomp', 'Corimon', 'ADN']);
    expect(new Set(names).size).toBe(names.length);
  });

  it('cada proyecto dice qué se hizo y con qué tecnologías', () => {
    for (const project of PROJECTS) {
      expect(project.did.length).withContext(project.name).toBeGreaterThan(0);
      expect(project.stack.length).withContext(project.name).toBeGreaterThan(0);
      expect(project.summary).withContext(project.name).not.toBe('');
    }
  });

  it('los enlaces externos usan https', () => {
    const links = [...PROJECTS.flatMap((p) => p.links), ...OTHER_WORK.flatMap((w) => w.links)];
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.url.startsWith('https://')).withContext(link.url).toBeTrue();
    }
  });

  it('el maquetado de hamburguesería ya no aparece', () => {
    const text = JSON.stringify([PROJECTS, OTHER_WORK]).toLowerCase();
    expect(text).not.toContain('hamburgues');
  });

  it('los proyectos de empresa no publican cifras ni detalles internos', () => {
    // Regresión de confidencialidad: solo se comparte qué es, qué se hizo y con qué tecnología.
    const text = JSON.stringify(PROJECTS).toLowerCase();
    for (const forbidden of ['sap', 'erp', 'migraci', 'commits', 'tests', 'autopartes', 'farmac']) {
      expect(text).withContext(forbidden).not.toContain(forbidden);
    }
    expect(text).not.toMatch(/\d{2,}\+/);
  });
});
