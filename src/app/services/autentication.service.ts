import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

/**
 * Servicio de autenticación de usuarios.
 * Permite realizar login verificando email y contraseña,
 * y establece el usuario actual en el sistema.
 */
@Injectable({
  providedIn: 'root'
})
export class AutenticationService {

  /**
   * Constructor del servicio.
   * @param usuarioService Servicio de usuarios para gestionar lista y estado de usuarios.
   */
  constructor(private usuarioService: UsuarioService) {}

  /**
   * Realiza el proceso de login.
   * - Busca un usuario que coincida con el email y la contraseña.
   * - Si lo encuentra, lo establece como usuario actual.
   *
   * @param email Correo electrónico del usuario.
   * @param password Contraseña en texto plano.
   * @returns `true` si el login es correcto, `false` en caso contrario.
   */
  login(email: string, password: string): boolean {
    const usuarios = this.usuarioService.getUsuarios();

    const user = usuarios.find((u: any) => u.email === email && u.password === password);

    if (user) {
      this.usuarioService.setUsuarioActual(user);
      return true;
    }

    return false;
  }
}
