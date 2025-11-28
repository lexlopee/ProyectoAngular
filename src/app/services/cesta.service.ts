import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

/**
 * Servicio para gestionar la cesta de la compra.
 * Permite agregar, eliminar, listar productos y calcular el total.
 * La cesta se guarda en localStorage, diferenciando entre usuario logueado y visitante.
 */
@Injectable({
  providedIn: 'root'
})
export class CestaService {

  /**
   * Constructor del servicio.
   * @param usuarioService Servicio de usuario para identificar al usuario actual.
   */
  constructor(private usuarioService: UsuarioService) {}

  /**
   * Obtiene la clave de la cesta en localStorage.
   * - Si hay usuario logueado: `cart_emailDelUsuario`
   * - Si no hay usuario: `cart_guest`
   * @returns Clave de la cesta en localStorage.
   */
  private getCartKey(): string {
    const user = this.usuarioService.getUsuarioActual();
    return user ? `cart_${user.email}` : 'cart_guest';
  }

  /**
   * Devuelve la cesta completa desde localStorage.
   * @returns Array de productos en la cesta.
   */
  getCesta(): any[] {
    return JSON.parse(localStorage.getItem(this.getCartKey()) || '[]');
  }

  /**
   * Alias de `getCesta`: devuelve los productos de la cesta.
   * @returns Array de productos.
   */
  getProductos(): any[] {
    return this.getCesta();
  }

  /**
   * Agrega un producto a la cesta sin controlar duplicados.
   * @param producto Producto a añadir.
   */
  agregar(producto: any): void {
    const cesta = this.getCesta();
    cesta.push(producto);
    localStorage.setItem(this.getCartKey(), JSON.stringify(cesta));
  }

  /**
   * Elimina un producto de la cesta por su ID.
   * @param id Identificador del producto a eliminar.
   */
  eliminarProducto(id: number): void {
    let cesta = this.getCesta();
    cesta = cesta.filter((p: any) => p.id !== id);
    localStorage.setItem(this.getCartKey(), JSON.stringify(cesta));
  }

  /**
   * Calcula el total de la cesta sumando los precios de todos los productos.
   * @returns Total numérico de la cesta.
   */
  getTotal(): number {
    const cesta = this.getCesta();
    return cesta.reduce((sum: number, p: any) => sum + Number(p.precio), 0);
  }

  /**
   * Limpia la cesta eliminando la clave del localStorage.
   */
  limpiar(): void {
    localStorage.removeItem(this.getCartKey());
  }

  /**
   * Vacía la cesta (alias de `limpiar`).
   */
  vaciar(): void {
    this.limpiar();
  }

  /**
   * Agrega un producto a la cesta controlando duplicados:
   * - Si ya existe, incrementa la cantidad.
   * - Si no existe, lo añade con cantidad = 1.
   * @param producto Producto a añadir o incrementar.
   */
  addProducto(producto: any): void {
    const cesta = this.getCesta();

    const existe = cesta.find((p: any) => p.id === producto.id);

    if (existe) {
      existe.cantidad = (existe.cantidad || 1) + 1;
    } else {
      cesta.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem(this.getCartKey(), JSON.stringify(cesta));
  }
}
