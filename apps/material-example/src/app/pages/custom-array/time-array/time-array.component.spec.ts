import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeArrayComponent } from './time-array.component';

describe('TimeArrayComponent', () => {
  let component: TimeArrayComponent;
  let fixture: ComponentFixture<TimeArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeArrayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
