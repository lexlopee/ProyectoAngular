import { UsuarioService } from './../services/usuario.service';
import { Component, AfterViewInit } from '@angular/core';
import { UsuarioRegistro } from '../services/usuario.service';

/**
 * Componente de la sección de usuario.
 *
 * - Gestiona las pestañas de login y registro.
 * - Captura y procesa los formularios de autenticación.
 * - Interactúa con el servicio de usuarios para validar y registrar.
 *
 * @version 1.0.0
 */
@Component({
  selector: 'app-seccion-usuario',
  standalone: true,
  templateUrl: './seccion-usuario.html',
  styleUrls: ['./seccion-usuario.css']
})
export class SeccionUsuario implements AfterViewInit {

  /**
   * Constructor del componente.
   * @param UsuarioService Servicio de usuarios para login, registro y gestión de datos.
   */
  constructor(private UsuarioService: UsuarioService) {}

  /**
   * Hook del ciclo de vida de Angular.
   * Se ejecuta después de que la vista se inicializa.
   * Configura pestañas y listeners de formularios.
   */
  ngAfterViewInit(): void {
    this.setupTabs();

    const loginForm = document.getElementById('loginForm') as HTMLFormElement;
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.loginUsuario();
    });

    const registerForm = document.getElementById('registerForm') as HTMLFormElement;
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.registrarUsuario();
    });
  }

  /**
   * Configura el cambio de pestañas entre login y registro.
   * - Activa/desactiva botones.
   * - Muestra el formulario correspondiente.
   */
  private setupTabs(): void {
    const tabButtons = document.querySelectorAll('.tab-button');
    const forms = document.querySelectorAll('.login-form');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        forms.forEach(form => form.classList.remove('active'));

        button.classList.add('active');
        const tabName = button.getAttribute('data-tab');
        const formToShow = document.getElementById(tabName + 'Form');
        if (formToShow) formToShow.classList.add('active');
      });
    });
  }

  /**
   * Procesa el formulario de login.
   * - Obtiene email/usuario y contraseña.
   * - Valida credenciales con el servicio de usuarios.
   * - Establece el usuario actual si es correcto.
   */
  private loginUsuario(): void {
    const emailOrUser = (document.getElementById('loginUsuario') as HTMLInputElement).value;
    const password = (document.getElementById('loginClave') as HTMLInputElement).value;

    const usuario = this.UsuarioService.login(emailOrUser, password);

    if (usuario) {
      this.UsuarioService.setUsuarioActual(usuario);
      alert('Login correcto ✅ Bienvenido ' + usuario.nombre);
    } else {
      alert('Usuario o contraseña incorrectos ❌');
    }
  }

  /**
   * Procesa el formulario de registro.
   * - Valida coincidencia de contraseñas.
   * - Verifica fortaleza de la contraseña.
   * - Genera y registra un nuevo usuario.
   */
  private registrarUsuario(): void {
    const nombre = (document.getElementById('regNombre') as HTMLInputElement).value;
    const email = (document.getElementById('regEmail') as HTMLInputElement).value;
    const password = (document.getElementById('regClave') as HTMLInputElement).value;
    const confirmar = (document.getElementById('regConfirmarClave') as HTMLInputElement).value;

    if (password !== confirmar) {
      alert('Las contraseñas no coinciden ❌');
      return;
    }

    const resultado = this.UsuarioService.verificarFortalezaPassword(password);
    if (!resultado.esSegura) {
      alert('Contraseña insegura: ' + resultado.errores.join(', '));
      return;
    }

    try {
      const nuevoUsuario = this.UsuarioService.generarUsuario({ nombre, email, password });
      this.UsuarioService.registrar(nuevoUsuario);
      alert('Usuario registrado correctamente ✅');
    } catch (error: any) {
      alert(error.message);
    }
  }
}
