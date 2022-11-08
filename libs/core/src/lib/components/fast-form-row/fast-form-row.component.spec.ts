import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FastFormRowComponent } from './fast-form-row.component';
import { ControlFactoryService } from '../../service/control-factory.service';
import { By } from '@angular/platform-browser';
import { FastFormsModule } from '../../fast-forms.module';
import { Question } from '../../model';
import { FastFormGroup } from '../../control/fast-form-group';
import { DummyInputModule } from '../../test/dummy-input.module.test-util';
import { CONTROL_CHILDREN, CONTROL_PROPERTIES, FORM_CONTROL } from '../util/inject-token';

describe('FastFormRowComponent', () => {
  let component: FastFormRowComponent;
  let fixture: ComponentFixture<FastFormRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FastFormsModule.forRoot(), DummyInputModule],
      providers: [
        {
          provide: CONTROL_PROPERTIES,
          useValue: {},
        },
        {
          provide: CONTROL_CHILDREN,
          useValue: [{
            id: 'name',
            type: 'dummy-input',
            defaultValue: 'meins'
          }, {
            id: 'surname',
            type: 'dummy-input'
          }]
        },
        {
          provide: FORM_CONTROL,
          deps: [ControlFactoryService, CONTROL_CHILDREN],
          useFactory: (cf: ControlFactoryService, children: Question[]) => {
            return new FastFormGroup(children, cf);
          }
        }
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(FastFormRowComponent);
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
    expect(component.formGroup.value).toEqual({name: 'test value', surname: null});
  });
});
