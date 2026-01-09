import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  private productosCesta: Producto[] = [];

  // 👇 CATÁLOGO GLOBAL (para el buscador)
  private productosTienda: Producto[] = [];

  /** Añadir producto a la cesta */
  addProducto(producto: Producto): void {
    this.productosCesta.push(producto);
  }

  /** Obtener productos de la cesta */
  getProductos(): Producto[] {
    return this.productosCesta;
  }

  /** Eliminar producto */
  eliminarProducto(id: number): void {
    this.productosCesta = this.productosCesta.filter(p => p.id !== id);
  }

  /** Vaciar cesta */
  vaciar(): void {
    this.productosCesta = [];
  }

  /** Total */
  getTotal(): number {
    return this.productosCesta.reduce((acc, p) => acc + p.precio, 0);
  }

  // 🔥🔥🔥 ESTO ES LO QUE TE FALTABA 🔥🔥🔥
  /** Registrar productos en el catálogo */
  registrarProducto(producto: Producto): void {
    this.productosTienda.push(producto);
  }

  /** Obtener TODOS los productos (buscador) */
  getTodosLosProductos(): Producto[] {
    return this.productosTienda;
  }
}
