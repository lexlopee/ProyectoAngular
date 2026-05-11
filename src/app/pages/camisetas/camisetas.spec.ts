import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Camisetas } from './camisetas';
import { CestaService } from '../../services/cesta.service';
import { provideRouter } from '@angular/router';

describe('Camisetas', () => {
  let component: Camisetas;
  let fixture: ComponentFixture<Camisetas>;
  let cestaService: CestaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Camisetas],
      providers: [provideRouter([]), CestaService]
    }).compileComponents();

    fixture = TestBed.createComponent(Camisetas);
    component = fixture.componentInstance;
    cestaService = TestBed.inject(CestaService);
    cestaService.vaciar();
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el título Camisetas', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Camisetas');
  });

  it('debería añadir un producto a la cesta', () => {
    component.anadir('Producto Test', 9.99, 'img.jpg');
    expect(cestaService.getProductos().length).toBe(1);
  });

  it('el producto debe tener categoría camisetas', () => {
    component.anadir('Producto Test', 9.99, 'img.jpg');
    expect(cestaService.getProductos()[0].categoria).toBe('camisetas');
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