import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleColumnComponent } from './double-column.component';

describe('DoubleColumnComponent', () => {
  let component: DoubleColumnComponent;
  let fixture: ComponentFixture<DoubleColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoubleColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DoubleColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
