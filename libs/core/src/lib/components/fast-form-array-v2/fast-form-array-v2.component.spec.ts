import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FastFormsModule } from '../../fast-forms.module';
import { FastFormBuilder } from '../../service/fast-form-builder';
import { FORM_CONTROL } from '../util/inject-token';

import { FastFormArrayV2Component } from './fast-form-array-v2.component';
import { FastFormsTestingModule } from '../../test/fast-forms-testing.module.test-util';

describe('FastFormArrayV2Component', () => {
  let component: FastFormArrayV2Component;
  let fixture: ComponentFixture<FastFormArrayV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FastFormsModule,
        FastFormsTestingModule
      ],
      declarations: [
        FastFormArrayV2Component
      ],
      providers: [{
        deps: [FastFormBuilder],
        provide: FORM_CONTROL,
        useFactory: (fb: FastFormBuilder) => fb.array({}, fb.dynamicControl(null, {type: 'input'}))
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(FastFormArrayV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
