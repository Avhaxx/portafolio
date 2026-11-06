import { TestBed } from '@angular/core/testing';

import { MotionService } from './motion.service';

function mockReducedMotion(reduce: boolean): void {
  spyOn(window, 'matchMedia').and.callFake(
    (query: string) => ({ matches: reduce && query.includes('reduce'), media: query }) as MediaQueryList,
  );
}

describe('MotionService', () => {
  const html = document.documentElement;

  afterEach(() => html.removeAttribute('data-motion'));

  it('arranca en marcha si no hay preferencia de movimiento reducido', () => {
    mockReducedMotion(false);
    const service = TestBed.inject(MotionService);
    TestBed.tick();
    expect(service.paused()).toBeFalse();
    expect(html.dataset['motion']).toBe('running');
  });

  it('arranca pausado si la persona pidió movimiento reducido', () => {
    mockReducedMotion(true);
    const service = TestBed.inject(MotionService);
    TestBed.tick();
    expect(service.paused()).toBeTrue();
    expect(html.dataset['motion']).toBe('paused');
  });

  it('toggle pausa y reanuda, y lo refleja en <html>', () => {
    mockReducedMotion(false);
    const service = TestBed.inject(MotionService);

    service.toggle();
    TestBed.tick();
    expect(service.paused()).toBeTrue();
    expect(html.dataset['motion']).toBe('paused');

    service.toggle();
    TestBed.tick();
    expect(service.paused()).toBeFalse();
    expect(html.dataset['motion']).toBe('running');
  });
});
