import { Component, ElementRef, Renderer2, AfterViewInit, inject } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CestaService } from '../../services/cesta.service';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cesta.html',
  styleUrls: ['./cesta.css']
})
export class Cesta implements AfterViewInit {

  private renderer = inject(Renderer2);
  private el = inject(ElementRef);
  private cestaService = inject(CestaService);
  private router = inject(Router);

  total = 0;

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

  actualizarCesta(): void {
    const contenedor = this.el.nativeElement.querySelector('#lista-cesta');
    const vacia      = this.el.nativeElement.querySelector('#vacia');
    const totalSpan  = this.el.nativeElement.querySelector('#total-cesta');

    if (!contenedor || !vacia || !totalSpan) return;

    contenedor.innerHTML = '';
    const productos = this.cestaService.getProductos();

    vacia.style.display = productos.length === 0 ? 'block' : 'none';

    this.total = this.cestaService.getTotal();
    totalSpan.textContent = new Intl.NumberFormat('es-ES', {
      style: 'currency', currency: 'EUR'
    }).format(this.total);

    window.dispatchEvent(new CustomEvent('actualizarCestaCabecera', { detail: productos.length }));

    productos.forEach((p: any) => {
      const item = this.renderer.createElement('div');
      this.renderer.addClass(item, 'item');
      this.renderer.setAttribute(item, 'role', 'listitem');
      this.renderer.setAttribute(item, 'aria-label',
        `${p.nombre}, precio ${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(p.precio)}`);

      const img = this.renderer.createElement('img');
      this.renderer.setAttribute(img, 'src', p.imagen);
      this.renderer.setAttribute(img, 'alt', `Imagen de ${p.nombre}`);
      this.renderer.setAttribute(img, 'width', '90');
      this.renderer.setAttribute(img, 'height', '100');
      this.renderer.setAttribute(img, 'loading', 'lazy');

      const info = this.renderer.createElement('div');
      this.renderer.setStyle(info, 'flex', '1');

      const h2 = this.renderer.createElement('h2');
      h2.textContent = p.nombre;

      const precio = this.renderer.createElement('p');
      precio.className = 'precio';
      precio.textContent = new Intl.NumberFormat('es-ES', {
        style: 'currency', currency: 'EUR'
      }).format(p.precio);

      const btn = this.renderer.createElement('button');
      btn.textContent = 'Eliminar';
      this.renderer.setAttribute(btn, 'type', 'button');
      this.renderer.setAttribute(btn, 'aria-label', `Eliminar ${p.nombre} de la cesta`);
      this.renderer.listen(btn, 'click', () => this.eliminar(p.id));

      this.renderer.appendChild(info, h2);
      this.renderer.appendChild(info, precio);
      this.renderer.appendChild(info, btn);
      this.renderer.appendChild(item, img);
      this.renderer.appendChild(item, info);
      this.renderer.appendChild(contenedor, item);
    });
  }

  eliminar(id: number): void {
    this.cestaService.eliminarProducto(id);
    this.actualizarCesta();
  }

  vaciar(): void {
    this.cestaService.vaciar();
    this.actualizarCesta();
  }
}