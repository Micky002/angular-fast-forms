import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFormArrayComponent } from './fast-form-array.component';

describe('FastFormArrayComponent', () => {
  let component: FastFormArrayComponent;
  let fixture: ComponentFixture<FastFormArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FastFormArrayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FastFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
