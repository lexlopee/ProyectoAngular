import { TestBed } from '@angular/core/testing';
import { BuscadorService } from './buscador.service';
import { CatalogoService } from './catalogo.service';

describe('BuscadorService', () => {
  let service: BuscadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuscadorService, CatalogoService]
    });
    service = TestBed.inject(BuscadorService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería encontrar camisetas buscando "camiseta"', () => {
    const resultados = service.buscarProductos('camiseta');
    expect(resultados.length).toBeGreaterThan(0);
  });

  it('debería devolver array vacío si no hay resultados', () => {
    const resultados = service.buscarProductos('xyzproductoquenoexiste');
    expect(resultados.length).toBe(0);
  });

  it('debería devolver vacío si el término está vacío', () => {
    const resultados = service.buscarProductos('');
    expect(resultados.length).toBe(0);
  });

  it('debería buscar sin distinguir mayúsculas y minúsculas', () => {
    const minusculas = service.buscarProductos('camiseta');
    const mayusculas = service.buscarProductos('CAMISETA');
    expect(minusculas.length).toBe(mayusculas.length);
  });

  it('debería normalizar acentos (búsqueda con acento = sin acento)', () => {
    const sinAcento = service.buscarProductos('pantalon');
    const conAcento = service.buscarProductos('pantalón');
    expect(sinAcento.length).toBe(conAcento.length);
  });

  it('debería encontrar zapatos buscando "zapatilla"', () => {
    const resultados = service.buscarProductos('zapatilla');
    expect(resultados.length).toBeGreaterThan(0);
  });

  it('los resultados deberían estar ordenados alfabéticamente', () => {
    const resultados = service.buscarProductos('camiseta');
    if (resultados.length > 1) {
      for (let i = 0; i < resultados.length - 1; i++) {
        expect(
          resultados[i].nombre.localeCompare(resultados[i + 1].nombre)
        ).toBeLessThanOrEqual(0);
      }
    }
  });
});