import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

export interface UsuarioRegistro {
  nombre: string;
  email: string;
  password: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  passwordHash: string;
  salt: string;
  fechaRegistro: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly usersKey = 'users';
  private readonly currentUserKey = 'currentUser';

  private readonly PBKDF2_ITERATIONS = 120000;
  private readonly KEY_LENGTH = 256;

  constructor() {}

  private normalizar(valor: string): string {
    return valor.trim().toLowerCase();
  }

  obtenerTodosLosUsuarios(): Usuario[] {
    try {
      const data = localStorage.getItem(this.usersKey);
      const usuarios = JSON.parse(data || '[]');
      return Array.isArray(usuarios) ? usuarios : [];
    } catch {
      return [];
    }
  }

  verificarUsuarioExiste(email: string): boolean {
    const emailNorm = this.normalizar(email);
    return this.obtenerTodosLosUsuarios().some(u => u.email === emailNorm);
  }

  private generarSalt(): string {
    return CryptoJS.lib.WordArray.random(256 / 8).toString();
  }

  private aplicarPBKDF2(password: string, salt: string): string {
    return CryptoJS.PBKDF2(password, salt, {
      keySize: this.KEY_LENGTH / 32,
      iterations: this.PBKDF2_ITERATIONS,
      hasher: CryptoJS.algo.SHA256
    }).toString();
  }

  private generarIdUnico(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).slice(2);
  }

  generarUsuario(data: UsuarioRegistro): Usuario {
    if (this.verificarUsuarioExiste(data.email)) {
      throw new Error('El usuario con este email ya existe');
    }

    const salt = this.generarSalt();
    const passwordHash = this.aplicarPBKDF2(data.password, salt);

    return {
      id: this.generarIdUnico(),
      nombre: data.nombre.trim(),
      email: this.normalizar(data.email),
      passwordHash,
      salt,
      fechaRegistro: new Date().toISOString(),
      activo: true
    };
  }

  verificarFortalezaPassword(password: string): { esSegura: boolean; errores: string[] } {
    const errores: string[] = [];

    if (password.length < 6) errores.push('Mínimo 6 caracteres');
    if (!/[A-Z]/.test(password)) errores.push('Al menos una mayúscula');
    if (!/[a-z]/.test(password)) errores.push('Al menos una minúscula');
    if (!/[0-9]/.test(password)) errores.push('Al menos un número');
    if (!/[!@#$%^&*()_+\-=\[\]{};\'":\\|,.<>\/?]/.test(password)) errores.push('Al menos un carácter especial');

    return { esSegura: errores.length === 0, errores };
  }

  registrar(usuario: Usuario): void {
    const users = this.obtenerTodosLosUsuarios();
    users.push(usuario);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  setUsuarioActual(usuario: Usuario): void {
    const { passwordHash, salt, ...seguro } = usuario;
    localStorage.setItem(this.currentUserKey, JSON.stringify(seguro));

    window.dispatchEvent(new CustomEvent('usuarioIniciado', {
      detail: seguro
    }));
  }

  getUsuarioActual(): Usuario | null {
    const data = localStorage.getItem(this.currentUserKey);
    return data ? JSON.parse(data) : null;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    window.dispatchEvent(new CustomEvent('usuarioCerrado'));
  }

  login(emailOrUser: string, password: string): Usuario | null {
    const entrada = this.normalizar(emailOrUser);
    const usuarios = this.obtenerTodosLosUsuarios();

    const usuario = usuarios.find(u =>
      u.email === entrada || u.nombre.toLowerCase() === entrada
    );

    if (!usuario) return null;

    const hash = this.aplicarPBKDF2(password, usuario.salt);
    return hash === usuario.passwordHash ? usuario : null;
  }
}
