import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl } from '@angular/forms';
import { FORM_CONTROL, QuestionDefinition } from '@ngx-fast-forms/core';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        SelectComponent
      ],
      providers: [
        {
          provide: FORM_CONTROL,
          useValue: new FormControl()
        },
        {
          provide: QuestionDefinition,
          useValue: new QuestionDefinition({
            type: 'input',
            id: 'test-id'
          })
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
