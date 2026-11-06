import { ALSO_WORKED_WITH, PRINCIPLES, STACK_GROUPS, TIMELINE } from './about';

describe('datos generales del portafolio', () => {
  it('el stack tiene cuatro grupos con elementos', () => {
    expect(STACK_GROUPS.map((group) => group.title)).toEqual([
      'Frontend',
      'Backend',
      'Datos e infraestructura',
      'Práctica',
    ]);
    for (const group of STACK_GROUPS) {
      expect(group.items.length).withContext(group.title).toBeGreaterThan(0);
    }
  });

  it('el stack, los principios y la trayectoria no atribuyen nada a proyectos concretos', () => {
    // Regresión de confidencialidad: la información es general, no "por proyecto".
    const text = JSON.stringify([STACK_GROUPS, ALSO_WORKED_WITH, PRINCIPLES, TIMELINE]).toLowerCase();
    for (const project of ['lecomp', 'corimon', 'adn']) {
      expect(text).withContext(project).not.toContain(project);
    }
    for (const forbidden of ['sap', 'erp', 'sistemas externos']) {
      expect(text).withContext(forbidden).not.toContain(forbidden);
    }
  });

  it('cada principio tiene título y texto', () => {
    expect(PRINCIPLES.length).toBe(4);
    for (const principle of PRINCIPLES) {
      expect(principle.title).not.toBe('');
      expect(principle.text).not.toBe('');
    }
  });
});
