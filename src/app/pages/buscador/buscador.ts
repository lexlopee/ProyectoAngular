import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BuscadorService } from '../../services/buscador.service';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './buscador.html',
  styleUrls: ['./buscador.css']
})
export class BuscadorComponent {

  private buscadorService = inject(BuscadorService);
  private router = inject(Router);

  busqueda: string = '';
  resultados: Producto[] = [];

  onBuscar(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.busqueda = input.value;
    this.resultados = this.busqueda.trim().length > 0
      ? this.buscadorService.buscarProductos(this.busqueda)
      : [];
  }

  irAProducto(producto: Producto): void {
    this.router.navigate([`/${producto.categoria}`]);
    this.cerrarResultados();
  }

  cerrarResultados(): void {
    this.resultados = [];
    this.busqueda = '';
  }

  onKeyDownInput(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.cerrarResultados();
      return;
    }
    if (event.key === 'ArrowDown' && this.resultados.length > 0) {
      event.preventDefault();
      const primera = document.querySelector('.producto-mini') as HTMLElement;
      primera?.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, producto: Producto): void {
    const target = event.target as HTMLElement;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        (target.nextElementSibling as HTMLElement)?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prev = target.previousElementSibling as HTMLElement;
        prev ? prev.focus() : document.getElementById('buscador')?.focus();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.irAProducto(producto);
        break;
      case 'Escape':
        this.cerrarResultados();
        document.getElementById('buscador')?.focus();
        break;
    }
  }
}