import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Accesorios } from './accesorios';
import { CestaService } from '../../services/cesta.service';
import { provideRouter } from '@angular/router';

describe('Accesorios', () => {
  let component: Accesorios;
  let fixture: ComponentFixture<Accesorios>;
  let cestaService: CestaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accesorios],
      providers: [provideRouter([]), CestaService]
    }).compileComponents();

    fixture = TestBed.createComponent(Accesorios);
    component = fixture.componentInstance;
    cestaService = TestBed.inject(CestaService);
    cestaService.vaciar();
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el título Accesorios', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Accesorios');
  });

  it('debería añadir un producto a la cesta', () => {
    component.anadir('Producto Test', 9.99, 'img.jpg');
    expect(cestaService.getProductos().length).toBe(1);
  });

  it('el producto debe tener categoría accesorios', () => {
    component.anadir('Producto Test', 9.99, 'img.jpg');
    expect(cestaService.getProductos()[0].categoria).toBe('accesorios');
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