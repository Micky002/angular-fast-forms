import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyInputComponent } from './lazy-input.component';

describe('LazyInputComponent', () => {
  let component: LazyInputComponent;
  let fixture: ComponentFixture<LazyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LazyInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LazyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
