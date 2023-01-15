import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyInputComponent } from './lazy-input.component';
import { FORM_CONTROL } from '@ngx-fast-forms/core';
import { FormControl } from '@angular/forms';

describe('LazyInputComponent', () => {
  let component: LazyInputComponent;
  let fixture: ComponentFixture<LazyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LazyInputComponent],
      providers: [
        {
          provide: FORM_CONTROL,
          useValue: new FormControl()
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LazyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
