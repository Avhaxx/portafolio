import { Component, DestroyRef, afterNextRender, inject } from '@angular/core';

import { ScrollSpy } from '../../core/scroll-spy.service';
import { NAV_LINKS } from '../../data/nav';
import { ContactSectionComponent } from './contact-section.component';
import { HeroComponent } from './hero.component';
import { PrinciplesSectionComponent } from './principles-section.component';
import { ProjectsSectionComponent } from './projects-section.component';
import { StackSectionComponent } from './stack-section.component';
import { TimelineSectionComponent } from './timeline-section.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    ProjectsSectionComponent,
    StackSectionComponent,
    PrinciplesSectionComponent,
    TimelineSectionComponent,
    ContactSectionComponent,
  ],
  template: `
    <app-hero />
    <app-projects-section />
    <app-stack-section />
    <app-principles-section />
    <app-timeline-section />
    <app-contact-section />
  `,
})
export class HomeComponent {
  constructor() {
    const spy = inject(ScrollSpy);
    afterNextRender(() => spy.observe(NAV_LINKS.map((link) => link.id)));
    inject(DestroyRef).onDestroy(() => spy.disconnect());
  }
}
