import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { ValidationComponent } from './validation.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ValidationComponent', () => {
  let component: ValidationComponent;
  let fixture: ComponentFixture<ValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ValidationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
