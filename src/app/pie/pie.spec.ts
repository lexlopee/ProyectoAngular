import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pie } from './pie';
import { provideRouter } from '@angular/router';

describe('Pie', () => {
  let component: Pie;
  let fixture: ComponentFixture<Pie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pie],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Pie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el año actual en el copyright', () => {
    expect(component.currentYear).toBe(new Date().getFullYear());
  });

  it('debería renderizar el elemento footer', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('footer')).toBeTruthy();
  });

  it('debería tener el método volverArriba', () => {
    expect(component.volverArriba).toBeDefined();
  });
});