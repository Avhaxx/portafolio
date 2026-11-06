import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PROFILE } from '../../data/profile';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading.component';

@Component({
  selector: 'app-contact-section',
  imports: [SectionHeadingComponent, RevealDirective, IconComponent],
  template: `
    <section id="contacto" class="section container-page">
      <app-section-heading index="05" label="Contacto">
        ¿Construimos algo <em>juntos?</em>
      </app-section-heading>

      <div appReveal class="glass accent-glow rounded-[2rem] p-7 md:p-12">
        <p class="lead max-w-xl">
          Cuéntame qué necesitas o revisa mi código. Respondo con gusto a propuestas de trabajo y a conversaciones
          técnicas.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <a class="btn btn-primary" [href]="profile.linkedin" target="_blank" rel="noopener noreferrer">
            <app-icon name="linkedin" /> Escríbeme en LinkedIn
            <span class="sr-only">(se abre en una pestaña nueva)</span>
          </a>
          <a class="btn btn-ghost" [href]="profile.github" target="_blank" rel="noopener noreferrer">
            <app-icon name="github" /> Ver GitHub
            <span class="sr-only">(se abre en una pestaña nueva)</span>
          </a>
          @if (profile.email) {
            <button type="button" class="btn btn-ghost" (click)="copyEmail()">
              <app-icon [name]="copied() ? 'check' : 'copy'" />
              {{ copied() ? 'Correo copiado' : profile.email }}
            </button>
          }
        </div>
        <p class="mt-4 text-sm text-ink-2" role="status">
          @if (copied()) {
            Correo copiado al portapapeles.
          } @else if (failed()) {
            No se pudo copiar. Puedes escribirme a {{ profile.email }}.
          }
        </p>
      </div>
    </section>
  `,
})
export class ContactSectionComponent {
  protected readonly profile = PROFILE;
  protected readonly copied = signal(false);
  protected readonly failed = signal(false);
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profile.email);
    } catch {
      this.copied.set(false);
      this.failed.set(true);
      return;
    }
    this.failed.set(false);
    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), 2200);
  }
}
