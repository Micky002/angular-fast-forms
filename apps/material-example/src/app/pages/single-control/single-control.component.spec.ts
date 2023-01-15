import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleControlComponent } from './single-control.component';

describe('SingleControlComponent', () => {
  let component: SingleControlComponent;
  let fixture: ComponentFixture<SingleControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
