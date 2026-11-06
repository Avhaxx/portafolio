import { Routes } from '@angular/router';

import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from './core/route-seo.strategy';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    title: DEFAULT_TITLE,
    data: { description: DEFAULT_DESCRIPTION },
    component: HomeComponent,
  },
  {
    path: '**',
    title: 'Página no encontrada · Antonio López',
    data: { description: 'La página que buscas no existe.' },
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
