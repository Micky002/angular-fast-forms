import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFormRowComponent } from './fast-form-row.component';
import { FastFormGroup, FastFormsModule, Question } from '@ngx-fast-forms/core';
import { ControlFactoryService } from '../../service/control-factory.service';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { DummyInputComponent, dummyInputProvider } from '../../test/dummy-input.test-util';

describe('FastFormRowComponent', () => {
  let component: FastFormRowComponent;
  let fixture: ComponentFixture<FastFormRowComponent>;
  let controlFactory: ControlFactoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FastFormsModule.forRoot()
      ],
      declarations: [
        FastFormRowComponent,
        DummyInputComponent
      ],
      providers: [
        dummyInputProvider()
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(FastFormRowComponent);
    controlFactory = TestBed.inject(ControlFactoryService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two input fields', async () => {
    const questions: Array<Question> = [{
      id: 'name',
      type: 'dummy-input',
      defaultValue: 'meins'
    }, {
      id: 'surname',
      type: 'dummy-input'
    }];
    component.formGroup = new FastFormGroup(questions, controlFactory);
    component.questions = questions;
    component.ngOnChanges();
    fixture.detectChanges();
    const nameInput = fixture.debugElement.query(By.css('input#name')).nativeElement as HTMLInputElement;
    expect(nameInput).toBeInstanceOf(HTMLInputElement);
    nameInput.value = 'test value';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.formGroup.value).toEqual({name: 'test value', surname: null});
  });
});
