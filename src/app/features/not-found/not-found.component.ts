import { Component, DestroyRef, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, IconComponent],
  template: `
    <section class="container-page flex min-h-svh flex-col justify-center pb-20 pt-32">
      <p class="eyebrow rise">Error 404</p>
      <h1 class="display h1 rise mt-5 max-w-3xl" style="--d: 100ms">Esta página <em>se perdió</em> en el espacio.</h1>
      <p class="lead rise mt-6 max-w-xl" style="--d: 200ms">
        El enlace que seguiste no existe o cambió de lugar. Puedes volver al inicio o ver los proyectos.
      </p>
      <div class="rise mt-9 flex flex-wrap gap-3" style="--d: 300ms">
        <a class="btn btn-primary" routerLink="/">Volver al inicio <app-icon name="arrow-right" /></a>
        <a class="btn btn-ghost" routerLink="/" fragment="proyectos">Ver proyectos</a>
      </div>
    </section>
  `,
})
export class NotFoundComponent {
  constructor() {
    // El servidor responde 200 a toda ruta (SPA): se pide que los buscadores no indexen la 404.
    const meta = inject(Meta);
    meta.addTag({ name: 'robots', content: 'noindex' });
    inject(DestroyRef).onDestroy(() => meta.removeTag('name="robots"'));
  }
}
