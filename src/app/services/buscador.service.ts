import { Injectable } from '@angular/core';
import { CatalogoService } from './catalogo.service';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor(private catalogoService: CatalogoService) {}

  /**
   * Normaliza texto para búsqueda:
   * - minúsculas
   * - sin espacios
   * - sin acentos
   */
  private normalizar(texto: string): string {
    return texto
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // elimina acentos
  }

  /**
   * Busca productos en el catálogo por nombre.
   */
  buscarProductos(termino: string): Producto[] {
    const productos = this.catalogoService.getProductos() || [];
    const texto = this.normalizar(termino);

    if (!texto) return [];

    return productos
      .filter(p => this.normalizar(p.nombre).includes(texto))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
}
