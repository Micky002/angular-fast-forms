import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleExampleComponent } from './simple-example.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SimpleExampleComponent', () => {
  let component: SimpleExampleComponent;
  let fixture: ComponentFixture<SimpleExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
