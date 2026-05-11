import { TestBed } from '@angular/core/testing';
import { CatalogoService } from './catalogo.service';

describe('CatalogoService', () => {
  let service: CatalogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogoService]
    });
    service = TestBed.inject(CatalogoService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería devolver la lista de productos', () => {
    const productos = service.getProductos();
    expect(productos).toBeTruthy();
  });

  it('debería tener productos en la lista', () => {
    const productos = service.getProductos();
    expect(productos.length).toBeGreaterThan(0);
  });

  it('cada producto debe tener id, nombre, precio, imagen, categoria y ruta', () => {
    const productos = service.getProductos();
    productos.forEach(p => {
      expect(p.id).toBeDefined();
      expect(p.nombre).toBeTruthy();
      expect(p.precio).toBeGreaterThan(0);
      expect(p.imagen).toBeTruthy();
      expect(p.categoria).toBeTruthy();
      expect(p.ruta).toBeTruthy();
    });
  });

  it('debería haber productos de categoría camisetas', () => {
    const camisetas = service.getProductos().filter(p => p.categoria === 'camisetas');
    expect(camisetas.length).toBeGreaterThan(0);
  });

  it('debería haber productos de categoría pantalones', () => {
    const pantalones = service.getProductos().filter(p => p.categoria === 'pantalones');
    expect(pantalones.length).toBeGreaterThan(0);
  });

  it('debería haber productos de categoría zapatos', () => {
    const zapatos = service.getProductos().filter(p => p.categoria === 'zapatos');
    expect(zapatos.length).toBeGreaterThan(0);
  });

  it('todos los ids deben ser únicos', () => {
    const productos = service.getProductos();
    const ids = productos.map(p => p.id);
    const idsUnicos = new Set(ids);
    expect(idsUnicos.size).toBe(ids.length);
  });
});