import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';

export const DEFAULT_TITLE = 'Antonio López · Desarrollador Full Stack con Angular y Laravel';
export const DEFAULT_DESCRIPTION =
  'Antonio López, ingeniero en computación y desarrollador full stack. Angular y Laravel en producción: aplicaciones web progresivas, plataformas multi-empresa y APIs.';

/** Título, descripción y Open Graph por ruta, a partir de `title` y `data` del router. */
@Injectable({ providedIn: 'root' })
export class RouteSeoStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot) ?? DEFAULT_TITLE;
    const description = this.descriptionFor(snapshot.root);

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
  }

  private descriptionFor(root: ActivatedRouteSnapshot): string {
    let leaf = root;
    while (leaf.firstChild) {
      leaf = leaf.firstChild;
    }
    const explicit = leaf.data['description'];
    return typeof explicit === 'string' ? explicit : DEFAULT_DESCRIPTION;
  }
}
