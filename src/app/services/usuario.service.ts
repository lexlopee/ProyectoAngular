import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

/**
 * Datos requeridos para registrar un nuevo usuario.
 */
export interface UsuarioRegistro {
  /** Nombre completo del usuario */
  nombre: string;
  /** Correo electrónico del usuario */
  email: string;
  /** Contraseña en texto plano (se encriptará) */
  password: string;
}

/**
 * Representa un usuario persistido en el sistema.
 */
export interface Usuario {
  /** Identificador único del usuario */
  id: string;
  /** Nombre completo */
  nombre: string;
  /** Correo electrónico normalizado */
  email: string;
  /** Hash de la contraseña generado con PBKDF2 */
  passwordHash: string;
  /** Salt aleatorio usado para el hash */
  salt: string;
  /** Fecha de registro */
  fechaRegistro: Date;
  /** Estado de actividad del usuario */
  activo: boolean;
}

/**
 * Servicio para gestionar usuarios en localStorage.
 * Incluye registro, login, logout y validación de contraseñas.
 */
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /** Clave usada para almacenar la lista de usuarios en localStorage */
  private readonly usersKey = 'users';

  /** Clave usada para almacenar el usuario actual en localStorage */
  private readonly currentUserKey = 'currentUser';

  /** Número de iteraciones para PBKDF2 */
  private readonly PBKDF2_ITERATIONS = 100000;

  /** Longitud de la clave generada por PBKDF2 */
  private readonly KEY_LENGTH = 256;

  constructor() {}

  /**
   * Obtiene todos los usuarios almacenados en localStorage.
   * @returns Lista de usuarios o un array vacío si no hay datos válidos.
   */
  obtenerTodosLosUsuarios(): Usuario[] {
    const data = localStorage.getItem(this.usersKey);
    try {
      const usuarios = JSON.parse(data || '[]');
      return Array.isArray(usuarios) ? usuarios : [];
    } catch {
      return [];
    }
  }

  /**
   * Verifica si un email ya está registrado en el sistema.
   * @param email Correo electrónico a comprobar.
   * @returns `true` si existe, `false` en caso contrario.
   */
  verificarUsuarioExiste(email: string): boolean {
    const usuarios = this.obtenerTodosLosUsuarios();
    const emailNormalizado = email.trim().toLowerCase();
    return usuarios.some((u: Usuario) => u.email.trim().toLowerCase() === emailNormalizado);
  }

  /**
   * Genera un salt aleatorio para hashing.
   * @returns Cadena aleatoria en formato hexadecimal.
   */
  private generarSalt(): string {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
  }

  /**
   * Aplica PBKDF2 al password usando SHA256.
   * @param password Contraseña en texto plano.
   * @param salt Salt asociado al usuario.
   * @returns Hash resultante en formato string.
   */
  private aplicarPBKDF2(password: string, salt: string): string {
    return CryptoJS.PBKDF2(password, salt, {
      keySize: this.KEY_LENGTH / 32,
      iterations: this.PBKDF2_ITERATIONS,
      hasher: CryptoJS.algo.SHA256
    }).toString();
  }

  /**
   * Genera un identificador único para cada usuario.
   * @returns ID único con prefijo `user_`.
   */
  private generarIdUnico(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Crea un nuevo usuario con contraseña encriptada.
   * @param usuarioRegistro Datos de registro (nombre, email, password).
   * @returns Usuario completo con hash y salt.
   * @throws Error si el email ya existe.
   */
  generarUsuario(usuarioRegistro: UsuarioRegistro): Usuario {
    if (this.verificarUsuarioExiste(usuarioRegistro.email)) {
      throw new Error('El usuario con este email ya existe');
    }

    const salt = this.generarSalt();
    const passwordHash = this.aplicarPBKDF2(usuarioRegistro.password, salt);

    return {
      id: this.generarIdUnico(),
      email: usuarioRegistro.email.toLowerCase().trim(),
      nombre: usuarioRegistro.nombre.trim(),
      passwordHash,
      salt,
      fechaRegistro: new Date(),
      activo: true
    };
  }

  /**
   * Verifica la fortaleza de una contraseña.
   * @param password Contraseña a evaluar.
   * @returns Objeto con `esSegura` y lista de errores.
   */
  verificarFortalezaPassword(password: string): { esSegura: boolean; errores: string[] } {
    const errores: string[] = [];

    if (password.length < 6) errores.push('Mínimo 6 caracteres');
    if (!/[A-Z]/.test(password)) errores.push('Al menos una mayúscula');
    if (!/[a-z]/.test(password)) errores.push('Al menos una minúscula');
    if (!/[0-9]/.test(password)) errores.push('Al menos un número');
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) errores.push('Al menos un carácter especial');

    return { esSegura: errores.length === 0, errores };
  }

  /**
   * Registra un usuario en localStorage.
   * @param usuario Usuario a registrar.
   */
  registrar(usuario: Usuario): void {
    const users = this.obtenerTodosLosUsuarios();
    users.push(usuario);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  /**
   * Devuelve todos los usuarios registrados.
   * @returns Lista de usuarios.
   */
  getUsuarios(): Usuario[] {
    return this.obtenerTodosLosUsuarios();
  }

  /**
   * Guarda el usuario actual en localStorage y lanza un evento de login.
   * @param usuario Usuario que inicia sesión.
   */
  setUsuarioActual(usuario: Usuario): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(usuario));

    window.dispatchEvent(new CustomEvent('usuarioIniciado', {
      detail: usuario
    }));
  }

  /**
   * Obtiene el usuario actualmente logueado.
   * @returns Usuario actual o `null` si no hay sesión.
   */
  getUsuarioActual(): Usuario | null {
    const data = localStorage.getItem(this.currentUserKey);
    return data ? JSON.parse(data) as Usuario : null;
  }

  /**
   * Cierra la sesión del usuario actual y lanza un evento de logout.
   */
  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    window.dispatchEvent(new CustomEvent('usuarioCerrado'));
  }

  /**
   * Realiza login verificando email/nombre y contraseña.
   * @param emailOrUser Email o nombre del usuario.
   * @param password Contraseña en texto plano.
   * @returns Usuario si las credenciales son correctas, `null` en caso contrario.
   */
  login(emailOrUser: string, password: string): Usuario | null {
    const usuarios = this.obtenerTodosLosUsuarios();
    const usuario = usuarios.find(u =>
      u.email === emailOrUser.trim().toLowerCase() ||
      u.nombre === emailOrUser.trim()
    );

    if (!usuario) return null;

    const hash = this.aplicarPBKDF2(password, usuario.salt);
    return hash === usuario.passwordHash ? usuario : null;
  }
}
