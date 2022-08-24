import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormControlFactoryService } from '../service/form-control-factory.service';
import { ValidatorFactoryService } from "../validation/validator-factory.service";
import { ReactiveFormsModule } from '@angular/forms';
import { FastFormComponent, FastFormsService } from '@ngx-fast-forms/core';
import { UiRegistryService } from '../service/ui-registry.service';

describe('FastFormComponent', () => {
  let component: FastFormComponent;
  let fixture: ComponentFixture<FastFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        FastFormComponent
      ],
      providers: [
        FastFormsService,
        FormControlFactoryService,
        ValidatorFactoryService,
        UiRegistryService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FastFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
