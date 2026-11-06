import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { MotionService } from '../core/motion.service';

interface Star {
  x: number;
  y: number;
  radius: number;
  depth: number;
  phase: number;
  speed: number;
}

const STAR_COUNT = 110;

/**
 * Fondo fijo del sitio, en capas:
 *  1. galaxia en vídeo (o fotograma fijo si el movimiento está pausado),
 *  2. estrellas en canvas con parallax suave (solo ratón),
 *  3. sombras de legibilidad que se oscurecen al bajar.
 * El movimiento se controla desde `MotionService`.
 */
@Component({
  selector: 'app-galaxy-background',
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      overflow: hidden;
      background: var(--color-void);
    }
    .media {
      position: absolute;
      inset: -6%;
      background: url('/media/galaxy-poster.jpg') center / cover no-repeat;
      will-change: transform;
    }
    .video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .stars {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    .shade {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(to top, var(--color-void) 0%, rgb(5 6 15 / 0.55) 32%, transparent 68%),
        radial-gradient(120% 90% at 50% 40%, transparent 55%, rgb(5 6 15 / 0.7) 100%);
    }
    .veil {
      position: absolute;
      inset: 0;
      background: var(--color-void);
      opacity: 0.5;
    }
    @supports (animation-timeline: scroll()) {
      .media {
        animation: drift linear both;
        animation-timeline: scroll(root block);
      }
      .veil {
        animation: dim linear both;
        animation-timeline: scroll(root block);
        animation-range: 0 90vh;
      }
    }
    @keyframes drift {
      from {
        transform: scale(1) translateY(0);
      }
      to {
        transform: scale(1.22) translateY(-5%);
      }
    }
    @keyframes dim {
      from {
        opacity: 0.12;
      }
      to {
        opacity: 0.82;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .media,
      .veil {
        animation: none;
      }
      .veil {
        opacity: 0.55;
      }
    }
  `,
  template: `
    <div class="media" aria-hidden="true">
      @if (videoRequested()) {
        <video
          #video
          class="video"
          autoplay
          muted
          loop
          playsinline
          disablepictureinpicture
          preload="auto"
          poster="/media/galaxy-poster.jpg"
        >
          <source src="/media/galaxy.webm" type="video/webm" />
          <source src="/media/galaxy.mp4" type="video/mp4" />
        </video>
      }
    </div>
    <canvas #stars class="stars" aria-hidden="true"></canvas>
    <div class="shade"></div>
    <div class="veil"></div>
  `,
})
export class GalaxyBackgroundComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly motion = inject(MotionService);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('stars');
  private readonly videoRef = viewChild<ElementRef<HTMLVideoElement>>('video');

  /**
   * El vídeo solo se descarga si alguna vez estuvo en marcha. Empieza en falso para que el
   * HTML prerenderizado muestre el fotograma fijo y el vídeo entre después de hidratar.
   */
  protected readonly videoRequested = signal(false);

  /** Controles del canvas de estrellas; existen solo en pantallas anchas con ratón. */
  private stars?: { run(): void; stop(): void };

  constructor() {
    afterNextRender(() => {
      if (!this.motion.paused()) {
        this.videoRequested.set(true);
      }
      this.setupStars();
    });

    effect(() => {
      // El prerenderizado no tiene vídeo ni canvas: todo esto es solo del navegador.
      if (!this.isBrowser) {
        return;
      }
      const paused = this.motion.paused();
      if (!paused) {
        this.videoRequested.set(true);
      }
      const video = this.videoRef()?.nativeElement;
      if (video) {
        if (paused) {
          video.pause();
        } else {
          void video.play().catch(() => undefined);
        }
      }
      if (paused) {
        this.stars?.stop();
      } else {
        this.stars?.run();
      }
    });
  }

  private setupStars(): void {
    const canvas = this.canvasRef().nativeElement;
    const context = canvas.getContext('2d');
    const wide = window.matchMedia('(min-width: 768px) and (pointer: fine)').matches;
    if (!context || !wide) {
      canvas.hidden = true;
      return;
    }

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.4 + Math.random() * 1.1,
      depth: 0.2 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.9,
    }));

    let width = 0;
    let height = 0;
    let targetX = 0;
    let targetY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let frame = 0;
    let running = false;

    const resize = (): void => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (!running) {
        paint(0);
      }
    };

    const paint = (time: number): void => {
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        const twinkle = running ? 0.5 + 0.5 * Math.sin((time / 1000) * star.speed + star.phase) : 0.5;
        const alpha = 0.3 + 0.4 * twinkle;
        const px = star.x * width + offsetX * star.depth * 18;
        const py = star.y * height + offsetY * star.depth * 18;
        context.beginPath();
        context.arc(px, py, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgb(205 216 255 / ${alpha.toFixed(3)})`;
        context.fill();
      }
    };

    const tick = (time: number): void => {
      offsetX += (targetX - offsetX) * 0.05;
      offsetY += (targetY - offsetY) * 0.05;
      paint(time);
      frame = requestAnimationFrame(tick);
    };

    const onPointer = (event: PointerEvent): void => {
      if (running && event.pointerType === 'mouse') {
        targetX = (event.clientX / window.innerWidth - 0.5) * 2;
        targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      }
    };

    const run = (): void => {
      if (running || document.hidden) {
        return;
      }
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const stop = (): void => {
      running = false;
      cancelAnimationFrame(frame);
      paint(0);
    };

    const onVisibility = (): void => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        running = false;
      } else if (!this.motion.paused()) {
        run();
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    this.stars = { run, stop };
    if (this.motion.paused()) {
      stop();
    } else {
      run();
    }

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
    });
  }
}
