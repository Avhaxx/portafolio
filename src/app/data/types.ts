export interface ProjectLink {
  readonly label: string;
  readonly url: string;
}

/**
 * Por confidencialidad, de cada proyecto de empresa solo se publica lo mínimo:
 * qué es en una línea, qué hice y con qué tecnologías.
 */
export interface Project {
  readonly name: string;
  readonly kind: string;
  readonly summary: string;
  readonly did: readonly string[];
  readonly stack: readonly string[];
  readonly links: readonly ProjectLink[];
  readonly isPrivate: boolean;
}

export interface OtherWork {
  readonly name: string;
  readonly description: string;
  readonly links: readonly ProjectLink[];
}

/** Lista general de tecnologías y prácticas, sin relacionarlas con proyectos concretos. */
export interface StackGroup {
  readonly title: string;
  readonly items: readonly string[];
}

export interface Principle {
  readonly title: string;
  readonly text: string;
}

export interface TimelineEntry {
  readonly label: string;
  readonly title: string;
  readonly detail: string;
}

export interface Profile {
  readonly name: string;
  readonly role: string;
  readonly experience: string;
  readonly availability: string;
  readonly bio: string;
  readonly languages: string;
  /** Correo público. Vacío = no se muestra el botón de copiar. */
  readonly email: string;
  readonly linkedin: string;
  readonly github: string;
}
