import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedControlComponent } from './nested-control.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NestedControlComponent', () => {
  let component: NestedControlComponent;
  let fixture: ComponentFixture<NestedControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NestedControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
