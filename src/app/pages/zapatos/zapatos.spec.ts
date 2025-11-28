import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zapatos } from './zapatos';

describe('Zaptos', () => {
  let component: Zapatos;
  let fixture: ComponentFixture<Zapatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Zapatos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zapatos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
