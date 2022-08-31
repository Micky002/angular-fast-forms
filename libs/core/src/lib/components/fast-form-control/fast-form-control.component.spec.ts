import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FastFormControlComponent } from './fast-form-control.component';
import { FastFormControl } from '../../control/fast-form-control';


describe('FastFormControlComponent', () => {
  let component: FastFormControlComponent;
  let fixture: ComponentFixture<FastFormControlComponent>;
  const control: FastFormControl = new FastFormControl({id: 'test-control', type: 'test-input'});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FastFormControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FastFormControlComponent);
    component = fixture.componentInstance;
    component.control = control;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
