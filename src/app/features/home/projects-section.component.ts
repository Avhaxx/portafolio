import { Component } from '@angular/core';

import { OTHER_WORK, PROJECTS } from '../../data/projects';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading.component';
import { ProjectCardComponent } from './project-card.component';

@Component({
  selector: 'app-projects-section',
  imports: [SectionHeadingComponent, ProjectCardComponent, RevealDirective, IconComponent],
  styles: `
    .work-link {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      min-height: 2.75rem;
      color: var(--color-ink-2);
      text-decoration: none;
      font-size: 0.9375rem;
      border-bottom: 1px solid transparent;
      transition: color 0.25s;
    }
    .work-link:hover {
      color: var(--color-ink);
    }
  `,
  template: `
    <section id="proyectos" class="section container-page">
      <app-section-heading index="01" label="Proyectos">
        Sistemas reales, <em>de punta a punta.</em>
      </app-section-heading>

      <div class="grid gap-5 lg:grid-cols-3">
        @for (project of projects; track project.name; let i = $index) {
          <app-project-card [appReveal]="i * 90" [project]="project" [index]="'0' + (i + 1)" />
        }
      </div>

      <div appReveal class="mt-16 md:mt-24">
        <h3 class="eyebrow mb-6">Más trabajos</h3>
        <ul class="divide-y divide-line border-y border-line">
          @for (work of otherWork; track work.name) {
            <li class="grid gap-3 py-6 md:grid-cols-12 md:items-center md:gap-6">
              <p class="font-serif text-2xl leading-tight md:col-span-5 md:text-3xl">{{ work.name }}</p>
              <p class="text-ink-2 md:col-span-4">{{ work.description }}</p>
              <div class="flex flex-wrap gap-x-5 md:col-span-3 md:justify-end">
                @for (link of work.links; track link.url) {
                  <a class="work-link" [href]="link.url" target="_blank" rel="noopener noreferrer">
                    {{ link.label }}
                    <app-icon name="arrow-up-right" />
                    <span class="sr-only">(se abre en una pestaña nueva)</span>
                  </a>
                }
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class ProjectsSectionComponent {
  protected readonly projects = PROJECTS;
  protected readonly otherWork = OTHER_WORK;
}
