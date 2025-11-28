/**
 * Representa un usuario almacenado en el sistema.
 * Incluye información de identificación, credenciales encriptadas y estado de actividad.
 */
export interface Usuario {
  /** Identificador único del usuario */
  id: string;
  /** Correo electrónico normalizado del usuario */
  email: string;
  /** Nombre completo del usuario */
  nombre: string;
  /** Hash de la contraseña generado con PBKDF2 */
  passwordHash: string;
  /** Salt aleatorio usado para el hash */
  salt: string;
  /** Fecha en la que el usuario se registró */
  fechaRegistro: Date;
  /** Estado de actividad del usuario (true = activo, false = inactivo) */
  activo: boolean;
}

/**
 * Datos requeridos para registrar un nuevo usuario.
 * Se usa en el formulario de registro antes de aplicar hashing.
 */
export interface UsuarioRegistro {
  /** Nombre completo del usuario */
  nombre: string;
  /** Correo electrónico del usuario */
  email: string;
  /** Contraseña en texto plano (se encriptará al guardar) */
  password: string;
}

/**
 * Datos requeridos para iniciar sesión.
 * Se usa en el formulario de login.
 */
export interface UsuarioLogin {
  /** Correo electrónico del usuario */
  email: string;
  /** Contraseña en texto plano */
  password: string;
}
