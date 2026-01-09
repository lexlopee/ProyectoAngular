import { Component, AfterViewInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CestaService } from '../services/cesta.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';
import { BuscadorComponent } from '../pages/buscador/buscador';

/**
 * Componente de cabecera de la aplicación.
 *
 * - Muestra el nombre del usuario logueado.
 * - Indica la cantidad de productos en la cesta.
 * - Escucha eventos globales para actualizar la información en tiempo real.
 * - Permite cerrar sesión desde la cabecera.
 *
 * @version 1.0.0
 */
@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterModule, CommonModule, BuscadorComponent],
  templateUrl: './cabecera.html',
  styleUrls: ['./cabecera.css'],
})
export class Cabecera implements AfterViewInit {

  /**
   * Nombre del usuario logueado (o `null` si no hay sesión activa).
   */
  usuario: any = null;

  /**
   * Cantidad de productos en la cesta.
   */
  cantidadCesta: number = 0;

  /**
   * Constructor del componente.
   * @param router Router para gestionar navegación.
   * @param cestaService Servicio de la cesta para obtener productos.
   * @param usuarioService Servicio de usuario para gestionar sesión.
   */
  constructor(
    private router: Router,
    private cestaService: CestaService,
    private usuarioService: UsuarioService
  ) {}

  /**
   * Hook del ciclo de vida de Angular.
   * Se ejecuta después de que la vista está cargada.
   * - Inicializa datos de usuario y cesta.
   * - Escucha eventos globales para actualizar la cabecera.
   */
  ngAfterViewInit(): void {
    this.actualizarUsuarioYCesta();

    window.addEventListener('actualizarCestaCabecera', (event: any) => {
      this.cantidadCesta = event.detail;
    });

    window.addEventListener('usuarioIniciado', (event: any) => {
      this.usuario = event.detail.nombre;
      this.cantidadCesta = this.cestaService.getProductos().length;
    });

    window.addEventListener('usuarioCerrado', () => {
      this.usuario = null;
      this.cantidadCesta = 0;
    });
  }

  /**
   * Obtiene el usuario actual y la cantidad de productos en la cesta al iniciar.
   * Si existe una sesión previa, actualiza los valores en la cabecera.
   */
  actualizarUsuarioYCesta(): void {
    const usuarioActual = this.usuarioService.getUsuarioActual();
    if (usuarioActual) {
      this.usuario = usuarioActual.nombre;
      this.cantidadCesta = this.cestaService.getProductos().length;
    }
  }

  /**
   * Cierra la sesión del usuario actual.
   * - Elimina la sesión guardada.
   * - Lanza un evento global para actualizar otros componentes.
   * - Muestra confirmación al usuario.
   * - Redirige a la página de inicio.
   */
  cerrarSesion(): void {
    this.usuarioService.logout();
    window.dispatchEvent(new CustomEvent('usuarioCerrado'));
    alert('Has cerrado sesión correctamente ✅');
    window.location.href = '/';
  }

}

