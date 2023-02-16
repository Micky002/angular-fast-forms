import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FastFormsModule } from '../../fast-forms.module';
import { FORM_CONTROL } from '../util/inject-token';
import { FastFormBuilder } from '../../service/fast-form-builder';

import { FastFormGroupV2Component } from './fast-form-group-v2.component';

describe('FastFormGroupV2Component', () => {
  let component: FastFormGroupV2Component;
  let fixture: ComponentFixture<FastFormGroupV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FastFormsModule
      ],
      declarations: [
        FastFormGroupV2Component
      ],
      providers: [{
        deps: [FastFormBuilder],
        provide: FORM_CONTROL,
        useFactory: (fb: FastFormBuilder) => fb.group({})
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(FastFormGroupV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
