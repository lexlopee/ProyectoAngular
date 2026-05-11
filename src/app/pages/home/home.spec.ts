import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { provideRouter } from '@angular/router';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar la sección hero', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.hero')).toBeTruthy();
  });

  it('debería mostrar FashionStore en el hero', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h1')?.textContent).toContain('FashionStore');
  });

  it('debería tener el enlace explorar colección', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.btn-hero')).toBeTruthy();
  });

  it('debería renderizar las tarjetas de valores', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('.value-card').length).toBe(3);
  });
});