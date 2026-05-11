import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cesta } from './cesta';
import { CestaService } from '../../services/cesta.service';
import { provideRouter } from '@angular/router';

describe('Cesta', () => {
  let component: Cesta;
  let fixture: ComponentFixture<Cesta>;
  let cestaService: CestaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cesta],
      providers: [provideRouter([]), CestaService]
    }).compileComponents();

    fixture = TestBed.createComponent(Cesta);
    component = fixture.componentInstance;
    cestaService = TestBed.inject(CestaService);
    cestaService.vaciar();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar el elemento main', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('main')).toBeTruthy();
  });

  it('debería mostrar el mensaje de cesta vacía', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#vacia')).toBeTruthy();
  });

  it('debería tener el botón vaciar cesta', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#vaciar-cesta')).toBeTruthy();
  });

  it('el total inicial debe ser 0', () => {
    expect(component.total).toBe(0);
  });
});