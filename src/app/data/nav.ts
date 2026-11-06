export interface NavLink {
  readonly id: string;
  readonly label: string;
}

/** Secciones de la home, en el orden en que aparecen. El `id` es el ancla de la sección. */
export const NAV_LINKS: readonly NavLink[] = [
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'stack', label: 'Stack' },
  { id: 'metodo', label: 'Método' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'contacto', label: 'Contacto' },
];
