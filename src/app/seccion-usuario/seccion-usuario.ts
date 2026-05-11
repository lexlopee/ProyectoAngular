import { Component, AfterViewInit, Renderer2, ElementRef, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioService, UsuarioRegistro } from '../services/usuario.service';

@Component({
  selector: 'app-seccion-usuario',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './seccion-usuario.html',
  styleUrls: ['./seccion-usuario.css']
})
export class SeccionUsuario implements AfterViewInit {

  private usuarioService = inject(UsuarioService);
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  ngAfterViewInit(): void {
    this.setupTabs();
    this.setupForms();
    this.setupPasswordToggle();
    this.setupValidacionTiempoReal();
  }

  private setupForms(): void {
    const loginForm = this.el.nativeElement.querySelector('#loginForm') as HTMLFormElement;
    const registerForm = this.el.nativeElement.querySelector('#registerForm') as HTMLFormElement;
    loginForm?.addEventListener('submit', (e: Event) => { e.preventDefault(); if (this.validarLogin()) this.loginUsuario(); });
    registerForm?.addEventListener('submit', (e: Event) => { e.preventDefault(); if (this.validarRegistro()) this.registrarUsuario(); });
  }

  private setupTabs(): void {
    const tabButtons = this.el.nativeElement.querySelectorAll('.tab-button');
    const forms = this.el.nativeElement.querySelectorAll('.login-form');

    tabButtons.forEach((button: HTMLElement) => {
      button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        const formToShow = this.el.nativeElement.querySelector(`#${tabName}Form`);

        tabButtons.forEach((btn: HTMLElement) => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });

        forms.forEach((form: HTMLElement) => {
          form.classList.remove('active');
          form.setAttribute('hidden', 'true');
        });

        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');

        if (formToShow) {
          formToShow.classList.add('active');
          formToShow.removeAttribute('hidden');
          const firstInput = formToShow.querySelector('input:not([type="checkbox"])');
          if (firstInput) (firstInput as HTMLElement).focus();
        }
      });
    });
  }

  private setupPasswordToggle(): void {
    const botones = this.el.nativeElement.querySelectorAll('.btn-ver-password');
    botones.forEach((btn: HTMLElement) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = this.el.nativeElement.querySelector(`#${targetId}`) as HTMLInputElement;
        if (!input) return;
        const mostrar = input.type === 'password';
        input.type = mostrar ? 'text' : 'password';
        btn.setAttribute('aria-label', mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña');
        btn.textContent = mostrar ? '🙈' : '👁';
      });
    });
  }

  private setupValidacionTiempoReal(): void {
    const campos: { id: string; validar: (v: string) => string }[] = [
      { id: 'loginUsuario', validar: v => v.length > 0 ? '' : 'Este campo es obligatorio' },
      { id: 'loginClave',   validar: v => v.length > 0 ? '' : 'Este campo es obligatorio' },
      { id: 'regNombre',    validar: v => v.trim().length >= 2 ? '' : 'Mínimo 2 caracteres' },
      { id: 'regEmail',     validar: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Email no válido' },
      { id: 'regUsuario',   validar: v => v.trim().length >= 3 ? '' : 'Mínimo 3 caracteres' },
      { id: 'regClave',     validar: v => v.length >= 8 ? '' : 'Mínimo 8 caracteres' },
      { id: 'regConfirmarClave', validar: v => {
        const clave = (this.el.nativeElement.querySelector('#regClave') as HTMLInputElement)?.value;
        return v === clave ? '' : 'Las contraseñas no coinciden';
      }},
    ];

    campos.forEach(({ id, validar }) => {
      const input = this.el.nativeElement.querySelector(`#${id}`) as HTMLInputElement;
      if (!input) return;
      input.addEventListener('blur', () => {
        const error = validar(input.value);
        this.mostrarErrorCampo(id, error);
        input.classList.toggle('error', !!error);
        input.classList.toggle('valido', !error);
        input.setAttribute('aria-invalid', error ? 'true' : 'false');
      });
    });
  }

  private mostrarErrorCampo(campoId: string, mensaje: string): void {
    const span = this.el.nativeElement.querySelector(`#${campoId}-error`);
    if (span) span.textContent = mensaje;
  }

  private mostrarErrorGlobal(formId: string, mensaje: string): void {
    const div = this.el.nativeElement.querySelector(`#${formId}-error`) as HTMLElement;
    if (!div) return;
    div.textContent = mensaje;
    div.style.display = mensaje ? 'block' : 'none';
  }

  private validarLogin(): boolean {
    let valido = true;
    const usuario = this.el.nativeElement.querySelector('#loginUsuario') as HTMLInputElement;
    const clave   = this.el.nativeElement.querySelector('#loginClave') as HTMLInputElement;

    if (!usuario.value.trim()) {
      this.mostrarErrorCampo('loginUsuario', 'Introduce tu email o usuario');
      usuario.classList.add('error');
      usuario.setAttribute('aria-invalid', 'true');
      valido = false;
    }
    if (!clave.value) {
      this.mostrarErrorCampo('loginClave', 'Introduce tu contraseña');
      clave.classList.add('error');
      clave.setAttribute('aria-invalid', 'true');
      valido = false;
    }
    if (!valido) (this.el.nativeElement.querySelector('.form-input.error') as HTMLElement)?.focus();
    return valido;
  }

  private validarRegistro(): boolean {
    let valido = true;
    const campos = [
      { id: 'regNombre',  msg: 'El nombre es obligatorio' },
      { id: 'regEmail',   msg: 'El email es obligatorio' },
      { id: 'regUsuario', msg: 'El usuario es obligatorio' },
      { id: 'regClave',   msg: 'La contraseña es obligatoria' },
      { id: 'regConfirmarClave', msg: 'Confirma tu contraseña' },
    ];

    campos.forEach(({ id, msg }) => {
      const input = this.el.nativeElement.querySelector(`#${id}`) as HTMLInputElement;
      if (!input?.value.trim()) {
        this.mostrarErrorCampo(id, msg);
        input?.classList.add('error');
        input?.setAttribute('aria-invalid', 'true');
        valido = false;
      }
    });

    const email = (this.el.nativeElement.querySelector('#regEmail') as HTMLInputElement)?.value;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.mostrarErrorCampo('regEmail', 'Email no válido (ej: nombre@dominio.com)');
      valido = false;
    }

    const clave    = (this.el.nativeElement.querySelector('#regClave') as HTMLInputElement)?.value;
    const confirmar = (this.el.nativeElement.querySelector('#regConfirmarClave') as HTMLInputElement)?.value;
    if (clave && confirmar && clave !== confirmar) {
      this.mostrarErrorCampo('regConfirmarClave', 'Las contraseñas no coinciden');
      valido = false;
    }

    const terminos = this.el.nativeElement.querySelector('#aceptarTerminos') as HTMLInputElement;
    if (!terminos?.checked) {
      this.mostrarErrorCampo('terminos', 'Debes aceptar los términos');
      valido = false;
    }

    if (!valido) (this.el.nativeElement.querySelector('.form-input.error') as HTMLElement)?.focus();
    return valido;
  }

  private loginUsuario(): void {
    const email    = (this.el.nativeElement.querySelector('#loginUsuario') as HTMLInputElement).value;
    const password = (this.el.nativeElement.querySelector('#loginClave') as HTMLInputElement).value;
    const usuario  = this.usuarioService.login(email, password);

    if (usuario) {
      this.usuarioService.setUsuarioActual(usuario);
      window.dispatchEvent(new CustomEvent('usuarioLogueado'));
      const div = this.el.nativeElement.querySelector('#login-error') as HTMLElement;
      if (div) {
        div.style.cssText = 'display:block;background:#e8f5e9;border-left-color:#2e7d32;color:#1b5e20';
        div.textContent = `✓ Bienvenido, ${usuario.nombre}. Sesión iniciada.`;
      }
      setTimeout(() => window.location.href = '/', 1500);
    } else {
      this.mostrarErrorGlobal('login', 'Email o contraseña incorrectos. Inténtalo de nuevo.');
      (this.el.nativeElement.querySelector('#loginUsuario') as HTMLElement)?.focus();
    }
  }

  private registrarUsuario(): void {
    const nombre   = (this.el.nativeElement.querySelector('#regNombre') as HTMLInputElement).value;
    const email    = (this.el.nativeElement.querySelector('#regEmail') as HTMLInputElement).value;
    const password = (this.el.nativeElement.querySelector('#regClave') as HTMLInputElement).value;

    const resultado = this.usuarioService.verificarFortalezaPassword(password);
    if (!resultado.esSegura) {
      this.mostrarErrorCampo('regClave', 'Contraseña insegura: ' + resultado.errores.join('. '));
      return;
    }

    try {
      const nuevoUsuario = this.usuarioService.generarUsuario({ nombre, email, password });
      this.usuarioService.registrar(nuevoUsuario);
      const div = this.el.nativeElement.querySelector('#register-error') as HTMLElement;
      if (div) {
        div.style.cssText = 'display:block;background:#e8f5e9;border-left-color:#2e7d32;color:#1b5e20';
        div.textContent = '✓ Cuenta creada. Ya puedes iniciar sesión.';
      }
    } catch (error: any) {
      this.mostrarErrorGlobal('register', error.message || 'Error al registrar.');
    }
  }
}