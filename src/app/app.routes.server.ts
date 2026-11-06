import { RenderMode, ServerRoute } from '@angular/ssr';

/** Todas las páginas se generan como HTML estático al compilar (SSG). */
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];
