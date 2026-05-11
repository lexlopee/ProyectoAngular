import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscadorComponent } from './buscador';
import { BuscadorService } from '../../services/buscador.service';
import { CatalogoService } from '../../services/catalogo.service';
import { provideRouter } from '@angular/router';

describe('BuscadorComponent', () => {
  let component: BuscadorComponent;
  let fixture: ComponentFixture<BuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorComponent],
      providers: [
        provideRouter([]),
        BuscadorService,
        CatalogoService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener busqueda vacía al inicio', () => {
    expect(component.busqueda).toBe('');
  });

  it('debería tener resultados vacíos al inicio', () => {
    expect(component.resultados.length).toBe(0);
  });

  it('debería renderizar el input de búsqueda', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('input[type="search"]')).toBeTruthy();
  });

  it('debería tener el input con aria-label', () => {
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector('input');
    expect(input?.getAttribute('aria-label')).toBeTruthy();
  });

  it('cerrarResultados debe limpiar busqueda y resultados', () => {
    component.busqueda = 'camiseta';
    component.resultados = [{ id: 1, nombre: 'Test', precio: 10, imagen: '', categoria: 'camisetas', ruta: '' }];
    component.cerrarResultados();
    expect(component.busqueda).toBe('');
    expect(component.resultados.length).toBe(0);
  });
});