import { Component } from '@angular/core';

import { PRINCIPLES } from '../../data/about';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading.component';

@Component({
  selector: 'app-principles-section',
  imports: [SectionHeadingComponent, RevealDirective],
  template: `
    <section id="metodo" class="section container-page">
      <app-section-heading index="03" label="Método">
        Cómo trabajo, <em>sin atajos.</em>
      </app-section-heading>

      <ol appReveal class="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
        @for (principle of principles; track principle.title; let i = $index) {
          <li class="bg-deep/80 p-7 backdrop-blur-md md:p-10">
            <p class="display text-5xl italic text-nebula" aria-hidden="true">0{{ i + 1 }}</p>
            <h3 class="mt-6 font-serif text-3xl leading-tight">{{ principle.title }}</h3>
            <p class="mt-4 text-ink-2">{{ principle.text }}</p>
          </li>
        }
      </ol>
    </section>
  `,
})
export class PrinciplesSectionComponent {
  protected readonly principles = PRINCIPLES;
}
