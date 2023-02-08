import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleControlComponent } from './single-control.component';
import { FastFormsModule } from '@ngx-fast-forms/core';

describe('SingleControlComponent', () => {
  let component: SingleControlComponent;
  let fixture: ComponentFixture<SingleControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FastFormsModule],
      declarations: [SingleControlComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
