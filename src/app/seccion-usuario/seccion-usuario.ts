import { UsuarioService } from './../services/usuario.service';
import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { UsuarioRegistro } from '../services/usuario.service';

@Component({
  selector: 'app-seccion-usuario',
  standalone: true,
  templateUrl: './seccion-usuario.html',
  styleUrls: ['./seccion-usuario.css']
})
export class SeccionUsuario implements AfterViewInit {

  constructor(
    private UsuarioService: UsuarioService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    this.setupTabs();
    this.setupForms();
  }

  /**
   * Configura los listeners de los formularios
   */
  private setupForms(): void {
    const loginForm = this.el.nativeElement.querySelector('#loginForm') as HTMLFormElement;
    const registerForm = this.el.nativeElement.querySelector('#registerForm') as HTMLFormElement;

    if (loginForm) {
      this.renderer.listen(loginForm, 'submit', (event) => {
        event.preventDefault();
        this.loginUsuario();
      });
    }

    if (registerForm) {
      this.renderer.listen(registerForm, 'submit', (event) => {
        event.preventDefault();
        this.registrarUsuario();
      });
    }
  }

  /**
   * Configura pestañas accesibles:
   * - role="tab"
   * - aria-selected
   * - aria-controls
   * - role="tabpanel"
   * - foco al cambiar
   */
  private setupTabs(): void {
    const tabButtons = this.el.nativeElement.querySelectorAll('.tab-button');
    const forms = this.el.nativeElement.querySelectorAll('.login-form');

    tabButtons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', () => {
        const tabName = button.getAttribute('data-tab');
        const formToShow = this.el.nativeElement.querySelector(`#${tabName}Form`);

        // Desactivar todas las pestañas
        tabButtons.forEach((btn: HTMLElement) => {
          this.renderer.removeClass(btn, 'active');
          this.renderer.setAttribute(btn, 'aria-selected', 'false');
        });

        // Ocultar todos los formularios
        forms.forEach((form: HTMLElement) => {
          this.renderer.removeClass(form, 'active');
          this.renderer.setAttribute(form, 'hidden', 'true');
        });

        // Activar pestaña seleccionada
        this.renderer.addClass(button, 'active');
        this.renderer.setAttribute(button, 'aria-selected', 'true');

        // Mostrar formulario correspondiente
        if (formToShow) {
          this.renderer.addClass(formToShow, 'active');
          this.renderer.removeAttribute(formToShow, 'hidden');

          // Mover foco al primer input del formulario
          const firstInput = formToShow.querySelector('input');
          if (firstInput) firstInput.focus();
        }
      });
    });
  }

  /**
   * LOGIN
   */
  private loginUsuario(): void {
    const emailOrUser = (this.el.nativeElement.querySelector('#loginUsuario') as HTMLInputElement).value;
    const password = (this.el.nativeElement.querySelector('#loginClave') as HTMLInputElement).value;

    const usuario = this.UsuarioService.login(emailOrUser, password);

    if (usuario) {
      this.UsuarioService.setUsuarioActual(usuario);
      alert('Login correcto ✅ Bienvenido ' + usuario.nombre);
    } else {
      alert('Usuario o contraseña incorrectos ❌');
    }
  }

  /**
   * REGISTRO
   */
  private registrarUsuario(): void {
    const nombre = (this.el.nativeElement.querySelector('#regNombre') as HTMLInputElement).value;
    const email = (this.el.nativeElement.querySelector('#regEmail') as HTMLInputElement).value;
    const password = (this.el.nativeElement.querySelector('#regClave') as HTMLInputElement).value;
    const confirmar = (this.el.nativeElement.querySelector('#regConfirmarClave') as HTMLInputElement).value;

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
