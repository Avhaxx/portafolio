import { OtherWork, Project } from './types';

export const PROJECTS: readonly Project[] = [
  {
    name: 'Lecomp',
    kind: 'Plataforma web B2B',
    summary: 'Aplicación web progresiva para la gestión comercial de una empresa.',
    did: [
      'Desarrollo full stack: interfaz en Angular y API en Laravel.',
      'Aplicación web progresiva (PWA).',
      'Autenticación y control de acceso por roles.',
    ],
    stack: ['Angular', 'TypeScript', 'Signals', 'PWA', 'Laravel', 'Bootstrap'],
    links: [],
    isPrivate: true,
  },
  {
    name: 'Corimon',
    kind: 'Plataforma web multi-empresa',
    summary: 'Sistema web de gestión para varias empresas, con los datos de cada una separados.',
    did: [
      'Desarrollo full stack: backend, vistas e integraciones.',
      'Arquitectura por capas y pruebas automatizadas.',
      'Entorno de desarrollo reproducible con Docker.',
    ],
    stack: ['Laravel', 'PHP', 'PostgreSQL', 'Alpine.js', 'Tailwind CSS', 'Docker', 'PHPUnit'],
    links: [],
    isPrivate: true,
  },
  {
    name: 'ADN',
    kind: 'Panel administrativo y API',
    summary: 'Panel administrativo y API para un sistema de gestión.',
    did: ['Desarrollo del panel administrativo y de la API REST.', 'Autenticación por token y roles de usuario.'],
    stack: ['Laravel', 'Passport', 'Blade', 'API REST'],
    links: [{ label: 'Sitio de ADN Medical', url: 'https://adnmedic.com/' }],
    isPrivate: true,
  },
];

export const OTHER_WORK: readonly OtherWork[] = [
  {
    name: 'Proyectos e Inversiones del Primo',
    description: 'Sitio web corporativo para una empresa.',
    links: [
      { label: 'Ver sitio', url: 'https://elprimosa.netlify.app/' },
      { label: 'Código', url: 'https://github.com/Avhaxx/webElprimo' },
    ],
  },
  {
    name: 'Chatbot de Telegram para Zeka Ferretería',
    description: 'Bot de atención con backend y frontend de administración.',
    links: [
      { label: 'Demo en vídeo', url: 'https://www.youtube.com/watch?v=wHNjavSVc2I' },
      { label: 'Backend', url: 'https://github.com/Avhaxx/ChatBot-Telegram-Back' },
      { label: 'Frontend', url: 'https://github.com/Avhaxx/ChatBot-Telegram-Front' },
    ],
  },
];
