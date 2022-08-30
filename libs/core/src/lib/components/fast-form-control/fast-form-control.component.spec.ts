import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFormControlComponent } from './fast-form-control.component';

describe('FastFormControlComponent', () => {
  let component: FastFormControlComponent;
  let fixture: ComponentFixture<FastFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FastFormControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FastFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
