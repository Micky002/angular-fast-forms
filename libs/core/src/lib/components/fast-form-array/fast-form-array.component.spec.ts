import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFormArrayComponent } from './fast-form-array.component';
import { FastFormArray } from '../../control/fast-form-array';
import { ControlFactoryService } from '../../service/control-factory.service';
import { ValidatorFactoryService } from '../../validation/validator-factory.service';

describe('FastFormArrayComponent', () => {
  let component: FastFormArrayComponent;
  let fixture: ComponentFixture<FastFormArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FastFormArrayComponent
      ],
      providers: [
        ControlFactoryService,
        ValidatorFactoryService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FastFormArrayComponent);
    const controlFactory = TestBed.inject(ControlFactoryService);
    component = fixture.componentInstance;
    component.formArray = new FastFormArray({id: 'test', type: 'test-input'}, controlFactory);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
