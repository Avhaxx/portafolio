import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PROFILE } from '../../data/profile';
import { ContactSectionComponent } from './contact-section.component';

type MutableProfile = { email: string };

describe('ContactSectionComponent', () => {
  const original = PROFILE.email;
  let fixture: ComponentFixture<ContactSectionComponent>;

  const copyButton = (): HTMLButtonElement | null => fixture.nativeElement.querySelector('button');

  function create(email: string): void {
    (PROFILE as MutableProfile).email = email;
    fixture = TestBed.createComponent(ContactSectionComponent);
    fixture.detectChanges();
  }

  afterEach(() => {
    (PROFILE as MutableProfile).email = original;
  });

  it('sin correo configurado no muestra el botón de copiar', () => {
    create('');
    expect(copyButton()).toBeNull();
  });

  it('siempre ofrece LinkedIn y GitHub', () => {
    create('');
    expect(fixture.nativeElement.querySelector(`a[href="${PROFILE.linkedin}"]`)).not.toBeNull();
    expect(fixture.nativeElement.querySelector(`a[href="${PROFILE.github}"]`)).not.toBeNull();
  });

  it('copia el correo y confirma al usuario', async () => {
    const writeText = jasmine.createSpy('writeText').and.resolveTo();
    spyOnProperty(navigator, 'clipboard', 'get').and.returnValue({ writeText } as unknown as Clipboard);
    create('hola@ejemplo.com');

    copyButton()!.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(writeText).toHaveBeenCalledWith('hola@ejemplo.com');
    expect(copyButton()!.textContent).toContain('Correo copiado');
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('copiado');
  });

  it('si el navegador rechaza copiar, no dice que se copió', async () => {
    const writeText = jasmine.createSpy('writeText').and.rejectWith(new Error('denegado'));
    spyOnProperty(navigator, 'clipboard', 'get').and.returnValue({ writeText } as unknown as Clipboard);
    create('hola@ejemplo.com');

    copyButton()!.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(copyButton()!.textContent).not.toContain('Correo copiado');
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('No se pudo copiar');
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('hola@ejemplo.com');
  });
});
