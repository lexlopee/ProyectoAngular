import { Component, ElementRef, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CestaService } from '../../services/cesta.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-pantalones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pantalones.html',
  styleUrls: ['./pantalones.css']
})
export class Pantalones {

  private cestaService = inject(CestaService);
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  anadir(nombre: string, precio: number, imagen: string): void {
    const producto: Producto = {
      id: Date.now(),
      nombre,
      precio,
      imagen,
      categoria: 'pantalones',
      ruta: '/pantalones'
    };
    this.cestaService.addProducto(producto);
    this.mostrarMensaje('✓ ' + nombre + ' añadido a la cesta');
    window.dispatchEvent(new CustomEvent('actualizarCestaCabecera', {
      detail: this.cestaService.getProductos().length
    }));
  }

  mostrarMensaje(texto: string): void {
    const msg = this.el.nativeElement.querySelector('#mensaje');
    if (!msg) return;
    this.renderer.setProperty(msg, 'textContent', texto);
    this.renderer.addClass(msg, 'visible');
    setTimeout(() => this.renderer.removeClass(msg, 'visible'), 2500);
  }
}