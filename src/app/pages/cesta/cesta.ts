import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CestaService } from '../../services/cesta.service';

/**
 * Componente de la página de cesta.
 *
 * - Muestra los productos añadidos por el usuario.
 * - Permite eliminar productos individuales o vaciar la cesta completa.
 * - Calcula y muestra el total de la compra.
 * - Se actualiza automáticamente al navegar a la ruta `/cesta`.
 *
 * @version 1.0.0
 */
@Component({
  selector: 'app-cesta',
  standalone: true,
  templateUrl: './cesta.html',
  styleUrls: ['./cesta.css']
})
export class Cesta implements AfterViewInit {
  /**
   * Total acumulado de la cesta.
   */
  total = 0;

  /**
   * Constructor del componente.
   * @param renderer Utilidad de Angular para manipular el DOM de forma segura.
   * @param el Referencia al elemento raíz del componente.
   * @param cestaService Servicio para manejar productos de la cesta.
   * @param router Router para detectar navegación y actualizar la vista.
   */
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cestaService: CestaService,
    private router: Router
  ) {}

  /**
   * Hook del ciclo de vida de Angular.
   * Se ejecuta después de que la vista se inicializa.
   * - Renderiza los productos iniciales.
   * - Detecta navegación a `/cesta` para actualizar la lista.
   * - Configura el botón de vaciar cesta.
   */
  ngAfterViewInit(): void {
    this.actualizarCesta();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/cesta') {
        this.actualizarCesta();
      }
    });

    const btnVaciar = this.el.nativeElement.querySelector('#vaciar-cesta');
    if (btnVaciar) {
      this.renderer.listen(btnVaciar, 'click', () => this.vaciar());
    }
  }

  /**
   * Actualiza la vista de la cesta.
   * - Limpia el contenedor.
   * - Renderiza los productos actuales.
   * - Calcula y muestra el total.
   * - Lanza un evento para actualizar la cabecera con la cantidad de productos.
   */
  actualizarCesta(): void {
    const contenedor = this.el.nativeElement.querySelector('#lista-cesta');
    const vacia = this.el.nativeElement.querySelector('#vacia');
    const totalSpan = this.el.nativeElement.querySelector('#total-cesta');

    if (!contenedor || !vacia || !totalSpan) return;

    contenedor.innerHTML = '';

    const productos = this.cestaService.getProductos();

    vacia.style.display = productos.length === 0 ? 'block' : 'none';

    this.total = this.cestaService.getTotal();
    totalSpan.textContent = this.total.toFixed(2);

    window.dispatchEvent(new CustomEvent('actualizarCestaCabecera', { detail: productos.length }));

    productos.forEach((p: any) => {
      const item = this.renderer.createElement('div');
      this.renderer.addClass(item, 'item');

      const img = this.renderer.createElement('img');
      this.renderer.setAttribute(img, 'src', p.imagen);
      this.renderer.setAttribute(img, 'width', '80');
      this.renderer.setAttribute(img, 'alt', p.nombre);

      const info = this.renderer.createElement('div');
      const h3 = this.renderer.createElement('h3');
      h3.textContent = p.nombre;

      const precio = this.renderer.createElement('p');
      precio.textContent = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(p.precio);

      const btn = this.renderer.createElement('button');
      btn.textContent = 'Eliminar';
      this.renderer.listen(btn, 'click', () => this.eliminar(p.id));

      this.renderer.appendChild(info, h3);
      this.renderer.appendChild(info, precio);
      this.renderer.appendChild(info, btn);
      this.renderer.appendChild(item, img);
      this.renderer.appendChild(item, info);
      this.renderer.appendChild(contenedor, item);
    });
  }

  /**
   * Elimina un producto de la cesta por su ID.
   * @param id Identificador del producto a eliminar.
   */
  eliminar(id: number): void {
    this.cestaService.eliminarProducto(id);
    this.actualizarCesta();
  }

  /**
   * Vacía toda la cesta y actualiza la vista.
   */
  vaciar(): void {
    this.cestaService.vaciar();
    this.actualizarCesta();
  }
}
