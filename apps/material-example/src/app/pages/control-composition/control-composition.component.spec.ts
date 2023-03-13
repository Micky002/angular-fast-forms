import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { ControlCompositionComponent } from './control-composition.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ControlCompositionComponent', () => {
  let component: ControlCompositionComponent;
  let fixture: ComponentFixture<ControlCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ControlCompositionComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ControlCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
