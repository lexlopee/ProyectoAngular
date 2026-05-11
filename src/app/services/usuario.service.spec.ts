import { TestBed } from '@angular/core/testing';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioService]
    });
    service = TestBed.inject(UsuarioService);
    service.logout();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería devolver null si no hay usuario logueado', () => {
    expect(service.getUsuarioActual()).toBeNull();
  });

  it('debería registrar un nuevo usuario correctamente', () => {
    const nuevoUsuario = service.generarUsuario({
      nombre: 'Test Usuario',
      email: 'test@test.com',
      password: 'Password1!'
    });
    service.registrar(nuevoUsuario);
    const encontrado = service.login('test@test.com', 'Password1!');
    expect(encontrado).toBeTruthy();
  });

  it('debería fallar el login con credenciales incorrectas', () => {
    const resultado = service.login('noexiste@test.com', 'wrongpass');
    expect(resultado).toBeFalsy();
  });

  it('debería verificar la fortaleza de contraseña débil', () => {
    const resultado = service.verificarFortalezaPassword('1234');
    expect(resultado.esSegura).toBeFalse();
  });

  it('debería verificar la fortaleza de contraseña fuerte', () => {
    const resultado = service.verificarFortalezaPassword('Password1!');
    expect(resultado.esSegura).toBeTrue();
  });

  it('debería poder hacer logout', () => {
    service.logout();
    expect(service.getUsuarioActual()).toBeNull();
  });
});