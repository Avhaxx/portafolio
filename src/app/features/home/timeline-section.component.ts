import { Component } from '@angular/core';

import { TIMELINE } from '../../data/about';
import { PROFILE } from '../../data/profile';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading.component';

@Component({
  selector: 'app-timeline-section',
  imports: [SectionHeadingComponent, RevealDirective],
  template: `
    <section id="trayectoria" class="section container-page">
      <app-section-heading index="04" label="Trayectoria">
        De la universidad a <em>producción.</em>
      </app-section-heading>

      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div appReveal class="lg:col-span-5">
          <p class="lead">{{ profile.bio }}</p>
          <p class="mono mt-6 text-xs text-ink-3">{{ profile.languages }}</p>
        </div>

        <ol class="relative ms-2 border-s border-line-strong lg:col-span-7">
          @for (entry of timeline; track entry.title; let i = $index) {
            <li [appReveal]="i * 80" class="relative pb-10 ps-8 last:pb-0">
              <span
                class="absolute top-2 -start-[5px] size-2.5 rounded-full bg-nebula shadow-[0_0_0_4px_rgb(108_140_255/0.18)]"
                aria-hidden="true"
              ></span>
              <p class="eyebrow">{{ entry.label }}</p>
              <h3 class="mt-2 font-serif text-3xl leading-tight">{{ entry.title }}</h3>
              <p class="mt-2 text-ink-2">{{ entry.detail }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class TimelineSectionComponent {
  protected readonly profile = PROFILE;
  protected readonly timeline = TIMELINE;
}
