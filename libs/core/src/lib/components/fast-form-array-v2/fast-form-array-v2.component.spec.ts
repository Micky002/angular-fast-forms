import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFormArrayV2Component } from './fast-form-array-v2.component';

describe('FastFormArrayV2Component', () => {
  let component: FastFormArrayV2Component;
  let fixture: ComponentFixture<FastFormArrayV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FastFormArrayV2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(FastFormArrayV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
