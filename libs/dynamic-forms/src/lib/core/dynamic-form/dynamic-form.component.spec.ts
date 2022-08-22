import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormService } from "@codentury/dynamic-forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormControlFactoryService } from '../control/form-control-factory.service';
import { ValidatorFactoryService } from "../validation/validator-factory.service";

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        DynamicFormComponent
      ],
      providers: [
        DynamicFormService,
        FormControlFactoryService,
        ValidatorFactoryService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
