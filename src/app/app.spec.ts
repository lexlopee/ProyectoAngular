import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Cabecera } from './cabecera/cabecera';
import { RouterTestingModule } from '@angular/router/testing';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
        Cabecera,           // Incluimos los child components necesarios
        RouterTestingModule // Provee ActivatedRoute y RouterLink
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const linkLogo = compiled.querySelector('nav .logo a');

    expect(linkLogo?.textContent).toContain('FashionStore');
  });
});
