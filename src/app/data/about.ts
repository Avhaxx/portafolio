import { Principle, StackGroup, TimelineEntry } from './types';

export const STACK_GROUPS: readonly StackGroup[] = [
  {
    title: 'Frontend',
    items: ['Angular', 'TypeScript', 'Signals', 'PWA', 'Tailwind CSS', 'Alpine.js', 'Bootstrap y SCSS'],
  },
  {
    title: 'Backend',
    items: ['Laravel · PHP 8', 'APIs REST', 'Autenticación con tokens (JWT y Passport)', 'Colas y tareas en segundo plano'],
  },
  {
    title: 'Datos e infraestructura',
    items: ['PostgreSQL', 'MySQL', 'IndexedDB', 'Docker', 'Git y GitHub'],
  },
  {
    title: 'Práctica',
    items: [
      'Arquitectura por capas',
      'Arquitectura multi-empresa',
      'Pruebas automatizadas',
      'Versionado de software',
      'Commits convencionales',
    ],
  },
];

export const ALSO_WORKED_WITH: readonly string[] = [
  'Python',
  'Flask',
  'FastAPI',
  'Django',
  'React',
  'Vue',
];

export const PRINCIPLES: readonly Principle[] = [
  {
    title: 'Cada capa hace lo suyo',
    text: 'Controladores delgados, la lógica en servicios y el acceso a datos en repositorios. Así cada cambio tiene un lugar obvio y el sistema aguanta crecer.',
  },
  {
    title: 'Los datos de cada cliente, aislados',
    text: 'Cuando un sistema atiende a varias empresas, el aislamiento de sus datos se diseña desde el principio y no depende de filtros que alguien pueda olvidar.',
  },
  {
    title: 'Probar antes de entregar',
    text: 'Pruebas automatizadas y un entorno de pruebas separado del real. Una funcionalidad no termina cuando funciona, sino cuando está comprobada.',
  },
  {
    title: 'Entregas que se pueden rastrear',
    text: 'Commits convencionales, versionado y registro de cambios. Siempre se sabe qué cambió, cuándo y por qué.',
  },
];

export const TIMELINE: readonly TimelineEntry[] = [
  {
    label: 'Hoy',
    title: 'Desarrollador full stack',
    detail: 'Un año de experiencia profesional construyendo sistemas web con Angular y Laravel.',
  },
  {
    label: 'Formación',
    title: 'Programa Fullstack y certificación en Git',
    detail: 'Oplesk · 6 meses de formación intensiva, con certificación en Git.',
  },
  {
    label: 'Formación',
    title: 'Python sin fronteras',
    detail: 'HTML, CSS, Flask y MySQL.',
  },
  {
    label: 'Base',
    title: 'Ingeniería en Computación',
    detail: 'Universidad José Antonio Páez.',
  },
];
