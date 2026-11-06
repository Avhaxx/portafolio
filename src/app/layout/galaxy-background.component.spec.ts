import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotionService } from '../core/motion.service';
import { GalaxyBackgroundComponent } from './galaxy-background.component';

function mockMedia(options: { reduce: boolean }): void {
  spyOn(window, 'matchMedia').and.callFake(
    (query: string) => ({ matches: options.reduce && query.includes('reduce'), media: query }) as MediaQueryList,
  );
}

describe('GalaxyBackgroundComponent', () => {
  function create(): ComponentFixture<GalaxyBackgroundComponent> {
    const fixture = TestBed.createComponent(GalaxyBackgroundComponent);
    fixture.detectChanges(); // primer render: sale el fotograma fijo
    fixture.detectChanges(); // tras hidratar: entra el vídeo si el movimiento está permitido
    return fixture;
  }

  it('reproduce el vídeo de la galaxia por defecto', () => {
    mockMedia({ reduce: false });
    const video = create().nativeElement.querySelector('video') as HTMLVideoElement;
    expect(video).not.toBeNull();
    expect(video.muted).toBeTrue();
    expect(video.loop).toBeTrue();
    expect(video.querySelectorAll('source').length).toBe(2);
  });

  it('con movimiento reducido no carga el vídeo y deja el fotograma fijo', () => {
    mockMedia({ reduce: true });
    const fixture = create();
    expect(fixture.nativeElement.querySelector('video')).toBeNull();
    expect(fixture.nativeElement.querySelector('.media')).not.toBeNull();
  });

  it('al reanudar las animaciones con movimiento reducido aparece el vídeo', () => {
    mockMedia({ reduce: true });
    const fixture = create();
    expect(fixture.nativeElement.querySelector('video')).toBeNull();

    TestBed.inject(MotionService).toggle();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('video')).not.toBeNull();
  });

  it('al pausar, el vídeo se detiene', () => {
    mockMedia({ reduce: false });
    const fixture = create();
    const video = fixture.nativeElement.querySelector('video') as HTMLVideoElement;
    const pause = spyOn(video, 'pause');

    TestBed.inject(MotionService).toggle();
    fixture.detectChanges();

    expect(pause).toHaveBeenCalled();
  });

  it('es decorativo para los lectores de pantalla', () => {
    mockMedia({ reduce: false });
    const fixture = create();
    expect(fixture.nativeElement.querySelector('.media').getAttribute('aria-hidden')).toBe('true');
    expect(fixture.nativeElement.querySelector('canvas').getAttribute('aria-hidden')).toBe('true');
  });

  it('en pantallas pequeñas o táctiles oculta el canvas de estrellas', () => {
    mockMedia({ reduce: false });
    const canvas = create().nativeElement.querySelector('canvas') as HTMLCanvasElement;
    expect(canvas.hidden).toBeTrue();
  });
});
