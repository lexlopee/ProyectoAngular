import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cesta } from '../cesta/cesta';

describe('Cesta', () => {
  let component: Cesta;
  let fixture: ComponentFixture<Cesta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cesta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cesta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
