import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControlFactoryService } from '../../service/form-control-factory.service';
import { ValidatorFactoryService } from '../../validation/validator-factory.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FastFormGroupComponent, FastFormsService } from '@ngx-fast-forms/core';

describe('FastFormGroupComponent', () => {
  let component: FastFormGroupComponent;
  let fixture: ComponentFixture<FastFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        FastFormGroupComponent
      ],
      providers: [
        FastFormsService,
        FormControlFactoryService,
        ValidatorFactoryService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FastFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
