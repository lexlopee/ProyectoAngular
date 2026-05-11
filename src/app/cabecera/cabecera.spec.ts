import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cabecera } from './cabecera';
import { provideRouter } from '@angular/router';
import { CestaService } from '../services/cesta.service';
import { UsuarioService } from '../services/usuario.service';

describe('Cabecera', () => {
  let component: Cabecera;
  let fixture: ComponentFixture<Cabecera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cabecera],
      providers: [
        provideRouter([]),
        CestaService,
        UsuarioService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Cabecera);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener cantidadCesta en 0 al inicio', () => {
    expect(component.cantidadCesta).toBe(0);
  });

  it('debería tener usuario null al inicio', () => {
    expect(component.usuario).toBeNull();
  });

  it('debería renderizar el logo con FashionStore', () => {
    const el: HTMLElement = fixture.nativeElement;
    const logo = el.querySelector('.logo a');
    expect(logo?.textContent?.trim()).toContain('FashionStore');
  });

  it('debería tener aria-expanded false en el botón hamburguesa', () => {
    const el: HTMLElement = fixture.nativeElement;
    const btn = el.querySelector('.menu-toggle');
    expect(btn?.getAttribute('aria-expanded')).toBe('false');
  });

  it('debería tener el menú con 7 elementos', () => {
    const el: HTMLElement = fixture.nativeElement;
    const items = el.querySelectorAll('.nav-links li');
    expect(items.length).toBe(7);
  });
});