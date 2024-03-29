import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FastFormRowComponent } from './fast-form-row.component';
import { ControlFactoryService } from '../../service/control-factory.service';
import { By } from '@angular/platform-browser';
import { FastFormsModule } from '../../fast-forms.module';
import { FastFormGroup } from '../../control/fast-form-group';
import { FastFormsTestingModule } from '../../test/fast-forms-testing.module.test-util';
import { CONTROL_PROPERTIES, FORM_CONTROL } from '../util/inject-token';
import { FormGroup } from '@angular/forms';
import { Provider } from '@angular/core';
import { QuestionDefinition } from '../question-definition';

describe('FastFormRowComponent', () => {
  let component: FastFormRowComponent;
  let fixture: ComponentFixture<FastFormRowComponent>;
  let controlFactory: ControlFactoryService;
  let formGroup: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FastFormsModule.forRoot(),
        FastFormsTestingModule
      ],
      providers: [{
        provide: QuestionDefinition,
        useValue: new QuestionDefinition({
          id: 'row',
          children: [{
            id: 'name',
            type: 'input',
            defaultValue: 'meins'
          }, {
            id: 'surname',
            type: 'input'
          }]
        })
      } as Provider, {
        provide: CONTROL_PROPERTIES,
        useValue: {}
      } as Provider, {
        provide: FORM_CONTROL,
        deps: [ControlFactoryService],
        useFactory: (cf: ControlFactoryService) => new FastFormGroup([{
          id: 'name',
          type: 'input',
          defaultValue: 'meins'
        }, {
          id: 'surname',
          type: 'input'
        }], cf)
      } as Provider]
    }).compileComponents();
    fixture = TestBed.createComponent(FastFormRowComponent);
    controlFactory = TestBed.inject(ControlFactoryService);
    formGroup = TestBed.inject<FormGroup>(FORM_CONTROL);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two input fields', async () => {
    component.ngOnChanges();
    fixture.detectChanges();
    const nameInput = fixture.debugElement.query(By.css('input#name')).nativeElement as HTMLInputElement;
    expect(nameInput).toBeInstanceOf(HTMLInputElement);
    nameInput.value = 'test value';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(formGroup.value).toEqual({name: 'test value', surname: null});
  });
});
