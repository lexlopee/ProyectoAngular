import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CestaService } from '../../services/cesta.service';
import { Producto } from '../../models/producto';

/**
 * Componente de la página de camisetas.
 *
 * - Muestra productos de tipo camiseta.
 * - Permite añadir productos a la cesta de compra.
 * - Muestra mensajes temporales de confirmación al usuario.
 *
 * @version 1.0.0
 */
@Component({
  selector: 'app-camisetas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './camisetas.html',
  styleUrls: ['./camisetas.css']
})
export class Camisetas {

  /**
   * Constructor del componente.
   * @param cestaService Servicio de la cesta para añadir productos.
   * @param el Referencia al elemento DOM del componente.
   * @param renderer Utilidad de Angular para manipular el DOM de forma segura.
   */
  constructor(
    private cestaService: CestaService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  /**
   * Añade un producto a la cesta.
   * - Genera un objeto producto con ID único.
   * - Lo envía al servicio de la cesta.
   * - Muestra un mensaje de confirmación.
   *
   * @param nombre Nombre del producto.
   * @param precio Precio del producto.
   * @param imagen URL o ruta de la imagen del producto.
   */
 anadir(nombre: string, precio: number, imagen: string): void {
  const producto: Producto = {
    id: Date.now(),
    nombre,
    precio,
    imagen,
    categoria: 'camisetas',
    ruta: '/camisetas'
  };

  this.cestaService.addProducto(producto);
  this.mostrarMensaje(`${nombre} añadido a la cesta 🛒`);
}


  /**
   * Muestra un mensaje temporal en pantalla.
   * - Inserta el texto en el elemento con id="mensaje".
   * - Aplica la clase CSS `visible` para mostrarlo.
   * - Después de 2 segundos, elimina la clase para ocultarlo.
   *
   * @param texto Mensaje a mostrar.
   */
  mostrarMensaje(texto: string): void {
    const mensaje = this.el.nativeElement.querySelector('#mensaje');
    this.renderer.setProperty(mensaje, 'textContent', texto);
    this.renderer.addClass(mensaje, 'visible');

    setTimeout(() => {
      this.renderer.removeClass(mensaje, 'visible');
    }, 2000);
  }
}
