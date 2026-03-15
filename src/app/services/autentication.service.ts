import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {

  constructor(private usuarioService: UsuarioService) {}

  login(email: string, password: string): boolean {

    // Usamos el login REAL del UsuarioService
    const usuario = this.usuarioService.login(email, password);

    if (usuario) {
      this.usuarioService.setUsuarioActual(usuario);
      return true;
    }

    return false;
  }
}
