import { Component } from '@angular/core';

import { ALSO_WORKED_WITH, STACK_GROUPS } from '../../data/about';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading.component';

@Component({
  selector: 'app-stack-section',
  imports: [SectionHeadingComponent, RevealDirective],
  template: `
    <section id="stack" class="section container-page">
      <app-section-heading index="02" label="Stack">
        Herramientas que ya usé <em>en producción.</em>
      </app-section-heading>

      <div class="grid gap-5 md:grid-cols-2">
        @for (group of groups; track group.title; let i = $index) {
          <article [appReveal]="(i % 2) * 90" class="glass rounded-3xl p-6 md:p-8">
            <h3 class="eyebrow">{{ group.title }}</h3>
            <ul class="mt-5 flex flex-wrap gap-2.5">
              @for (item of group.items; track item) {
                <li class="chip chip-lg">{{ item }}</li>
              }
            </ul>
          </article>
        }
      </div>

      <div appReveal class="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
        <p class="eyebrow shrink-0">También he trabajado con</p>
        <ul class="flex flex-wrap gap-2">
          @for (tech of alsoWorkedWith; track tech) {
            <li class="chip">{{ tech }}</li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class StackSectionComponent {
  protected readonly groups = STACK_GROUPS;
  protected readonly alsoWorkedWith = ALSO_WORKED_WITH;
}
