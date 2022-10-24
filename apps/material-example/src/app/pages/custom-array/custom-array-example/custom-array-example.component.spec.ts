import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomArrayExampleComponent } from './custom-array-example.component';

describe('CustomArrayExampleComponent', () => {
  let component: CustomArrayExampleComponent;
  let fixture: ComponentFixture<CustomArrayExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomArrayExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomArrayExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
