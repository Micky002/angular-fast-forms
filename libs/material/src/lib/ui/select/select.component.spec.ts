import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CONTROL_PROPERTIES, FORM_CONTROL, QuestionDefinition } from '@ngx-fast-forms/core';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SelectOption, SelectProperties } from './select.models';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let http: HttpTestingController;

  it('should create', async () => {
    await init();
    expect(component).toBeTruthy();
  });

  it('should fetch options', async () => {
    await init({
      optionsEndpoint: '/test/options'
    });
    const selectOptions = [{
      name: 'First Options',
      value: 'one'
    }] as SelectOption[];
    http.expectOne('/test/options').flush(selectOptions);
    http.verify();
    expect(component.selectOptions).toEqual(selectOptions);
  });

  async function init(props: SelectProperties = {}) {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatSelectModule
      ],
      declarations: [
        SelectComponent
      ],
      providers: [{
        provide: QuestionDefinition,
        useValue: new QuestionDefinition({
          id: 'test-id',
          properties: props
        })
      }, {
        provide: CONTROL_PROPERTIES,
        useValue: props
      }, {
        provide: FORM_CONTROL,
        useValue: new FormControl
      }]
    }).compileComponents();

    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});


