import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

import { ScrollSpy } from '../core/scroll-spy.service';
import { NAV_LINKS } from '../data/nav';
import { PROFILE } from '../data/profile';
import { IconComponent } from '../shared/icon.component';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, IconComponent],
  host: { '(document:keydown.escape)': 'onEscape()' },
  styles: `
    .nav-link {
      padding: 0.5rem 0.85rem;
      border-radius: 999px;
      font-size: 0.875rem;
      color: var(--color-ink-2);
      text-decoration: none;
      transition:
        color 0.25s,
        background-color 0.25s;
    }
    .nav-link:hover {
      color: var(--color-ink);
    }
    .nav-link.is-active {
      color: var(--color-ink);
      background: rgb(150 170 255 / 0.14);
    }
    .sheet-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.9rem 1rem;
      border-radius: 14px;
      color: var(--color-ink);
      text-decoration: none;
      font-size: 1.0625rem;
    }
    .sheet-link:hover,
    .sheet-link.is-active {
      background: rgb(150 170 255 / 0.1);
    }
  `,
  template: `
    <header class="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center px-3 pt-3 sm:pt-4">
      <nav
        aria-label="Principal"
        class="glass pointer-events-auto flex w-full max-w-fit items-center gap-1 rounded-full py-1.5 ps-5 pe-1.5 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.6)] max-md:justify-between max-md:max-w-[22rem]"
      >
        <a routerLink="/" class="me-2 font-serif text-xl leading-none text-ink no-underline" aria-label="Antonio López, ir al inicio">
          Antonio López
        </a>

        <ul class="hidden items-center gap-0.5 md:flex">
          @for (link of links; track link.id) {
            <li>
              <a
                class="nav-link"
                routerLink="/"
                [fragment]="link.id"
                [class.is-active]="spy.active() === link.id"
                [attr.aria-current]="spy.active() === link.id ? 'location' : null"
              >
                {{ link.label }}
              </a>
            </li>
          }
        </ul>

        <button
          #toggleButton
          type="button"
          class="grid size-11 place-items-center rounded-full text-ink md:hidden"
          [attr.aria-expanded]="open()"
          aria-controls="menu-movil"
          [attr.aria-label]="open() ? 'Cerrar menú' : 'Abrir menú'"
          (click)="toggle()"
        >
          <app-icon [name]="open() ? 'close' : 'menu'" class="text-xl" />
        </button>
      </nav>

      @if (open()) {
        <div id="menu-movil" class="glass pointer-events-auto mt-2 w-full max-w-[22rem] rounded-3xl p-2 md:hidden">
          @for (link of links; track link.id) {
            <a
              class="sheet-link"
              routerLink="/"
              [fragment]="link.id"
              [class.is-active]="spy.active() === link.id"
              [attr.aria-current]="spy.active() === link.id ? 'location' : null"
              (click)="close()"
            >
              {{ link.label }}
              <app-icon name="arrow-right" class="text-ink-3" />
            </a>
          }
          <div class="mt-1 flex gap-2 border-t border-line p-3">
            <a class="btn btn-ghost flex-1" [href]="profile.github" target="_blank" rel="noopener noreferrer">
              <app-icon name="github" /> GitHub
            </a>
            <a class="btn btn-ghost flex-1" [href]="profile.linkedin" target="_blank" rel="noopener noreferrer">
              <app-icon name="linkedin" /> LinkedIn
            </a>
          </div>
        </div>
      }
    </header>
  `,
})
export class NavComponent {
  protected readonly spy = inject(ScrollSpy);
  protected readonly links = NAV_LINKS;
  protected readonly profile = PROFILE;
  protected readonly open = signal(false);
  private readonly toggleButton = viewChild<ElementRef<HTMLButtonElement>>('toggleButton');

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.close());
  }

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected close(): void {
    this.open.set(false);
  }

  /** Escape cierra el menú y devuelve el foco al botón que lo abrió. */
  protected onEscape(): void {
    if (this.open()) {
      this.close();
      this.toggleButton()?.nativeElement.focus();
    }
  }
}
