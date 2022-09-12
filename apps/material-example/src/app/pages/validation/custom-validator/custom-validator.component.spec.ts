import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomValidatorComponent } from './custom-validator.component';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomValidatorComponent', () => {
  let component: CustomValidatorComponent;
  let fixture: ComponentFixture<CustomValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialFastFormsModule
      ],
      declarations: [
        CustomValidatorComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
