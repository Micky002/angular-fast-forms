import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFormRowComponent } from './fast-form-row.component';

describe('FastFormRowComponent', () => {
  let component: FastFormRowComponent;
  let fixture: ComponentFixture<FastFormRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FastFormRowComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FastFormRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});