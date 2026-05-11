import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Zapatos } from './zapatos';
import { CestaService } from '../../services/cesta.service';
import { provideRouter } from '@angular/router';

describe('Zapatos', () => {
  let component: Zapatos;
  let fixture: ComponentFixture<Zapatos>;
  let cestaService: CestaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Zapatos],
      providers: [provideRouter([]), CestaService]
    }).compileComponents();

    fixture = TestBed.createComponent(Zapatos);
    component = fixture.componentInstance;
    cestaService = TestBed.inject(CestaService);
    cestaService.vaciar();
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el título Zapatos', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Zapatos');
  });

  it('debería añadir un producto a la cesta', () => {
    component.anadir('Producto Test', 9.99, 'img.jpg');
    expect(cestaService.getProductos().length).toBe(1);
  });

  it('el producto debe tener categoría zapatos', () => {
    component.anadir('Producto Test', 9.99, 'img.jpg');
    expect(cestaService.getProductos()[0].categoria).toBe('zapatos');
  });

  it('debería renderizar tarjetas de productos', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('.tarjeta').length).toBeGreaterThan(0);
  });

  it('todas las imágenes deben tener alt no vacío', () => {
    const el: HTMLElement = fixture.nativeElement;
    el.querySelectorAll('img').forEach(img => {
      expect(img.getAttribute('alt')).toBeTruthy();
    });
  });
});