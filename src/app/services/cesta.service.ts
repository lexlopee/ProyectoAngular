import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  private readonly CESTA_KEY = 'cesta';
  private readonly TIENDA_KEY = 'productosTienda';

  private productosCesta: Producto[] = [];
  private productosTienda: Producto[] = [];

  constructor() {
    this.cargarCesta();
    this.cargarCatalogo();
  }

  /** ------------------------------
   *  MÉTODOS DE CESTA
   * ------------------------------ */

  addProducto(producto: Producto): void {
    this.productosCesta.push(producto);
    this.guardarCesta();
    this.emitirActualizacion();
  }

  getProductos(): Producto[] {
    return this.productosCesta;
  }

  eliminarProducto(id: number): void {
    this.productosCesta = this.productosCesta.filter(p => p.id !== id);
    this.guardarCesta();
    this.emitirActualizacion();
  }

  vaciar(): void {
    this.productosCesta = [];
    this.guardarCesta();
    this.emitirActualizacion();
  }

  getTotal(): number {
    return this.productosCesta.reduce((acc, p) => acc + p.precio, 0);
  }

  getCantidad(): number {
    return this.productosCesta.length;
  }

  /** Persistencia */
  private guardarCesta(): void {
    localStorage.setItem(this.CESTA_KEY, JSON.stringify(this.productosCesta));
  }

  private cargarCesta(): void {
    const data = localStorage.getItem(this.CESTA_KEY);
    this.productosCesta = data ? JSON.parse(data) : [];
  }

  /** Evento para actualizar cabecera */
  private emitirActualizacion(): void {
    window.dispatchEvent(new CustomEvent('actualizarCestaCabecera', {
      detail: this.getCantidad()
    }));
  }

  /** ------------------------------
   *  CATÁLOGO GLOBAL (BUSCADOR)
   * ------------------------------ */

  registrarProducto(producto: Producto): void {
    this.productosTienda.push(producto);
    this.guardarCatalogo();
  }

  getTodosLosProductos(): Producto[] {
    return this.productosTienda;
  }

  private guardarCatalogo(): void {
    localStorage.setItem(this.TIENDA_KEY, JSON.stringify(this.productosTienda));
  }

  private cargarCatalogo(): void {
    const data = localStorage.getItem(this.TIENDA_KEY);
    this.productosTienda = data ? JSON.parse(data) : [];
  }
}
