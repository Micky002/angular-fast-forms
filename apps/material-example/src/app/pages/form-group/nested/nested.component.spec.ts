import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedComponent } from './nested.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NestedComponent', () => {
  let component: NestedComponent;
  let fixture: ComponentFixture<NestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
