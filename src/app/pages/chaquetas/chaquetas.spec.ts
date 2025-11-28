import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chaquetas } from './chaquetas';

describe('Chaquetas', () => {
  let component: Chaquetas;
  let fixture: ComponentFixture<Chaquetas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chaquetas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chaquetas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
