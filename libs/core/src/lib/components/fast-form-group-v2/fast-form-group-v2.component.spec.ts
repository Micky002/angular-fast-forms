import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFormGroupV2Component } from './fast-form-group-v2.component';

describe('FastFormGroupV2Component', () => {
  let component: FastFormGroupV2Component;
  let fixture: ComponentFixture<FastFormGroupV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FastFormGroupV2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(FastFormGroupV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
