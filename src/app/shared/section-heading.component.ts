import { Component, input } from '@angular/core';

import { RevealDirective } from './reveal.directive';

/** Encabezado de sección con número y etiqueta en mono. El título entra por contenido proyectado. */
@Component({
  selector: 'app-section-heading',
  imports: [RevealDirective],
  template: `
    <div appReveal class="mb-12 max-w-3xl md:mb-16">
      <p class="eyebrow flex items-center gap-3">
        <span class="text-nebula">{{ index() }}</span>
        <span class="h-px w-10 bg-line-strong" aria-hidden="true"></span>
        <span>{{ label() }}</span>
      </p>
      <h2 class="display h2 mt-5"><ng-content /></h2>
    </div>
  `,
})
export class SectionHeadingComponent {
  readonly index = input.required<string>();
  readonly label = input.required<string>();
}
