import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROFILE } from '../../data/profile';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, IconComponent],
  styles: `
    .social {
      display: grid;
      place-items: center;
      width: 3rem;
      height: 3rem;
      border-radius: 999px;
      border: 1px solid var(--color-line-strong);
      background: rgb(255 255 255 / 0.03);
      color: var(--color-ink);
      font-size: 1.2rem;
      transition:
        border-color 0.25s,
        background-color 0.25s,
        transform 0.35s var(--ease-out-expo);
    }
    .social:hover {
      border-color: rgb(150 170 255 / 0.55);
      background: rgb(108 140 255 / 0.1);
      transform: translateY(-2px);
    }
    h1 {
      text-shadow: 0 2px 40px rgb(5 6 15 / 0.6);
    }
  `,
  template: `
    <section class="relative flex min-h-svh flex-col justify-end pb-10 pt-32 md:pb-16" aria-labelledby="hero-title">
      <div class="container-page">
        <p
          class="rise mono mb-7 inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs text-ink-2"
          style="--d: 100ms"
        >
          <span class="relative flex size-2" aria-hidden="true">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70"></span>
            <span class="relative inline-flex size-2 rounded-full bg-emerald-400"></span>
          </span>
          {{ profile.availability }}
        </p>

        <p class="eyebrow rise mb-6" style="--d: 200ms">
          Ingeniero en computación · Full Stack · {{ profile.experience }}
        </p>

        <h1 id="hero-title" class="display h1 rise max-w-4xl" style="--d: 300ms">
          Software que sostiene <em>operaciones reales.</em>
        </h1>

        <p class="lead rise mt-7 max-w-xl" style="--d: 450ms">
          Angular y Laravel en producción: aplicaciones web progresivas, plataformas multi-empresa y APIs para
          sistemas de gestión.
        </p>

        <div class="rise mt-9 flex flex-wrap items-center gap-x-3 gap-y-4" style="--d: 600ms">
          <div class="flex w-full gap-3 sm:w-auto">
            <a class="btn btn-primary flex-1 sm:flex-none" routerLink="/" fragment="proyectos">
              Ver proyectos <app-icon name="arrow-down" />
            </a>
            <a class="btn btn-ghost flex-1 sm:flex-none" routerLink="/" fragment="contacto">Contactar</a>
          </div>
          <span class="mx-1 hidden h-6 w-px bg-line-strong sm:block" aria-hidden="true"></span>
          <div class="flex gap-3">
            <a class="social" [href]="profile.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub (se abre en una pestaña nueva)">
              <app-icon name="github" />
            </a>
            <a class="social" [href]="profile.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (se abre en una pestaña nueva)">
              <app-icon name="linkedin" />
            </a>
          </div>
        </div>

        <div
          class="rise mono mt-14 flex items-center justify-between gap-4 border-t border-line pt-5 text-xs text-ink-3 md:mt-20"
          style="--d: 800ms"
        >
          <span>Angular · Laravel · PostgreSQL</span>
          <span class="hidden sm:inline">PWA · Multi-empresa · APIs</span>
          <span class="inline-flex items-center gap-2">Desplaza <app-icon name="arrow-down" /></span>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly profile = PROFILE;
}
