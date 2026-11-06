import { Component, input } from '@angular/core';

export type IconName =
  | 'github'
  | 'linkedin'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'copy'
  | 'check'
  | 'menu'
  | 'close'
  | 'lock';

/** Iconos SVG en línea. Heredan el color del texto (currentColor) y son decorativos. */
@Component({
  selector: 'app-icon',
  styles: `
    :host {
      display: inline-flex;
      width: 1em;
      height: 1em;
      flex: none;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `,
  template: `
    @switch (name()) {
      @case ('github') {
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
      }
      @case ('linkedin') {
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path
            d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"
          />
        </svg>
      }
      @default {
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          @switch (name()) {
            @case ('arrow-right') {
              <path d="M5 12h14M13 6l6 6-6 6" />
            }
            @case ('arrow-up-right') {
              <path d="M7 17 17 7M8 7h9v9" />
            }
            @case ('arrow-up') {
              <path d="M12 19V5M6 11l6-6 6 6" />
            }
            @case ('arrow-down') {
              <path d="M12 5v14M6 13l6 6 6-6" />
            }
            @case ('copy') {
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V6a2 2 0 0 1 2-2h9" />
            }
            @case ('check') {
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            }
            @case ('menu') {
              <path d="M4 8h16M4 16h16" />
            }
            @case ('close') {
              <path d="m6 6 12 12M18 6 6 18" />
            }
            @case ('lock') {
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            }
          }
        </svg>
      }
    }
  `,
})
export class IconComponent {
  readonly name = input.required<IconName>();
}
