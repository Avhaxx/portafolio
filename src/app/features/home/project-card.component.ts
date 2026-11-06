import { Component, input } from '@angular/core';

import { Project } from '../../data/types';
import { GlowDirective } from '../../shared/glow.directive';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-project-card',
  imports: [GlowDirective, IconComponent],
  host: { class: 'block' },
  styles: `
    .card {
      transition:
        transform 0.6s var(--ease-out-expo),
        border-color 0.3s;
    }
    .card:hover {
      transform: translateY(-4px);
      border-color: var(--color-line-strong);
    }
    .numeral {
      background: linear-gradient(180deg, rgb(139 163 255 / 0.2), transparent 85%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .ext {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      min-height: 2.75rem;
      color: var(--color-ink);
      text-decoration: none;
      border-bottom: 1px solid var(--color-line-strong);
      transition: border-color 0.25s;
    }
    .ext:hover {
      border-color: var(--color-nebula);
    }
  `,
  template: `
    <article appGlow class="card glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 md:p-8">
      <p
        class="numeral display pointer-events-none absolute -top-2 right-5 select-none text-[5rem] italic leading-none"
        aria-hidden="true"
      >
        {{ index() }}
      </p>

      <p class="eyebrow">{{ project().kind }}</p>
      <h3 class="display h3 relative mt-3">{{ project().name }}</h3>
      <p class="mt-4 text-ink-2">{{ project().summary }}</p>

      <div class="mt-7">
        <h4 class="eyebrow">Lo que hice</h4>
        <ul class="mt-3 space-y-2.5 text-ink-2">
          @for (item of project().did; track item) {
            <li class="flex gap-3">
              <app-icon name="check" class="mt-1.5 text-nebula" />
              <span>{{ item }}</span>
            </li>
          }
        </ul>
      </div>

      <div class="mt-7">
        <h4 class="eyebrow">Con lo que trabajé</h4>
        <ul class="mt-3 flex flex-wrap gap-2">
          @for (tech of project().stack; track tech) {
            <li class="chip">{{ tech }}</li>
          }
        </ul>
      </div>

      <div class="mt-auto pt-8">
        <div class="flex flex-wrap items-center justify-between gap-x-4 border-t border-line pt-5">
          @if (project().isPrivate) {
            <span class="mono inline-flex items-center gap-1.5 text-xs text-ink-3">
              <app-icon name="lock" /> Código privado
            </span>
          }
          @for (link of project().links; track link.url) {
            <a class="ext text-sm" [href]="link.url" target="_blank" rel="noopener noreferrer">
              {{ link.label }} <app-icon name="arrow-up-right" />
              <span class="sr-only">(se abre en una pestaña nueva)</span>
            </a>
          }
        </div>
      </div>
    </article>
  `,
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  readonly index = input.required<string>();
}
