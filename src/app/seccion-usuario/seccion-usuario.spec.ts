import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeccionUsuario } from './seccion-usuario';
import { provideRouter } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

describe('SeccionUsuario', () => {
  let component: SeccionUsuario;
  let fixture: ComponentFixture<SeccionUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionUsuario],
      providers: [provideRouter([]), UsuarioService]
    }).compileComponents();

    fixture = TestBed.createComponent(SeccionUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar las pestañas de login y registro', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('.tab-button').length).toBe(2);
  });

  it('la pestaña de login debe estar activa por defecto', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#tab-login')?.classList.contains('active')).toBeTrue();
  });

  it('el formulario de login debe estar visible por defecto', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#loginForm')?.classList.contains('active')).toBeTrue();
  });

  it('debería tener campos con aria-required', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('[aria-required="true"]').length).toBeGreaterThan(0);
  });
});