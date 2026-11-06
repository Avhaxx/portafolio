import { TestBed } from '@angular/core/testing';

import { IconComponent, IconName } from './icon.component';

const NAMES: readonly IconName[] = [
  'github',
  'linkedin',
  'arrow-right',
  'arrow-up-right',
  'arrow-up',
  'arrow-down',
  'copy',
  'check',
  'menu',
  'close',
  'lock',
];

describe('IconComponent', () => {
  for (const name of NAMES) {
    it(`dibuja el icono "${name}" como decorativo`, () => {
      const fixture = TestBed.createComponent(IconComponent);
      fixture.componentRef.setInput('name', name);
      fixture.detectChanges();

      const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
      expect(svg).withContext(name).not.toBeNull();
      expect(svg.getAttribute('aria-hidden')).toBe('true');
      expect(svg.querySelectorAll('path, rect').length).withContext(name).toBeGreaterThan(0);
    });
  }
});
