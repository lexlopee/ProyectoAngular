import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pantalones } from './pantalones';

describe('Pantalones', () => {
  let component: Pantalones;
  let fixture: ComponentFixture<Pantalones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pantalones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pantalones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
