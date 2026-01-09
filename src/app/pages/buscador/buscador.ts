import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BuscadorService } from '../../services/buscador.service'

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './buscador.html',
  styleUrls: ['./buscador.css']
})
export class BuscadorComponent {
  busqueda: string = '';
  resultados: Producto[] = [];

  constructor(private buscadorService: BuscadorService, private router: Router) {}

 onBuscar(event: Event) {
  const input = event.target as HTMLInputElement;
  this.busqueda = input.value;

  if (this.busqueda.trim().length > 0) {
    this.resultados = this.buscadorService.buscarProductos(this.busqueda);
  } else {
    this.resultados = [];
  }
}


irAProducto(producto: Producto) {
  // Navega a la ruta de la categoría (ej: /pantalones, /camisetas, etc.)
  this.router.navigate([`/${producto.categoria}`]);

  // Limpia resultados y búsqueda
  this.resultados = [];
  this.busqueda = '';
}


}
