import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cabecera } from './cabecera';
import { RouterTestingModule } from '@angular/router/testing';

describe('Cabecera', () => {
  let component: Cabecera;
  let fixture: ComponentFixture<Cabecera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Cabecera,
        RouterTestingModule // Esto resuelve ActivatedRoute y RouterLink
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cabecera);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
