import { Injectable } from '@angular/core';
import { CatalogoService } from './catalogo.service';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor(private catalogoService: CatalogoService) {}

  /**
   * Busca productos en el catálogo por nombre.
   * @param termino Texto introducido por el usuario.
   * @returns Lista de productos que coinciden con el término.
   */
  buscarProductos(termino: string): Producto[] {
    const productos = this.catalogoService.getProductos();
    const texto = termino.toLowerCase().trim();

    return productos.filter(p =>
      p.nombre.toLowerCase().includes(texto)
    );
  }
}
