import { TestBed } from '@angular/core/testing';
import { CestaService } from './cesta.service';
import { Producto } from '../models/producto';

describe('CestaService', () => {
  let service: CestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CestaService);
    // Limpiamos la cesta antes de cada test
    service.vaciar();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería empezar con la cesta vacía', () => {
    expect(service.getProductos().length).toBe(0);
  });

  it('debería añadir un producto a la cesta', () => {
    const producto: Producto = {
      id: 1,
      nombre: 'Camiseta azul Navy',
      precio: 19.99,
      imagen: 'img.jpg',
      categoria: 'camisetas',
      ruta: '/camisetas'
    };
    service.addProducto(producto);
    expect(service.getProductos().length).toBe(1);
  });

  it('debería contener el producto añadido con los datos correctos', () => {
    const producto: Producto = {
      id: 1,
      nombre: 'Camiseta azul Navy',
      precio: 19.99,
      imagen: 'img.jpg',
      categoria: 'camisetas',
      ruta: '/camisetas'
    };
    service.addProducto(producto);
    const productos = service.getProductos();
    expect(productos[0].nombre).toBe('Camiseta azul Navy');
    expect(productos[0].precio).toBe(19.99);
  });

  it('debería eliminar un producto de la cesta por su id', () => {
    const producto: Producto = {
      id: 1,
      nombre: 'Camiseta azul Navy',
      precio: 19.99,
      imagen: 'img.jpg',
      categoria: 'camisetas',
      ruta: '/camisetas'
    };
    service.addProducto(producto);
    service.eliminarProducto(1);
    expect(service.getProductos().length).toBe(0);
  });

  it('debería calcular el total correctamente', () => {
    const p1: Producto = {
      id: 1, nombre: 'A', precio: 10.00,
      imagen: '', categoria: 'camisetas', ruta: ''
    };
    const p2: Producto = {
      id: 2, nombre: 'B', precio: 20.00,
      imagen: '', categoria: 'pantalones', ruta: ''
    };
    service.addProducto(p1);
    service.addProducto(p2);
    expect(service.getTotal()).toBe(30);
  });

  it('debería vaciar la cesta', () => {
    const producto: Producto = {
      id: 1, nombre: 'A', precio: 10,
      imagen: '', categoria: 'camisetas', ruta: ''
    };
    service.addProducto(producto);
    service.vaciar();
    expect(service.getProductos().length).toBe(0);
  });

  it('el total debería ser 0 cuando la cesta está vacía', () => {
    expect(service.getTotal()).toBe(0);
  });

  it('debería mantener varios productos correctamente', () => {
    for (let i = 1; i <= 3; i++) {
      service.addProducto({
        id: i, nombre: `Producto ${i}`, precio: i * 10,
        imagen: '', categoria: 'camisetas', ruta: ''
      });
    }
    expect(service.getProductos().length).toBe(3);
    expect(service.getTotal()).toBe(60);
  });
});