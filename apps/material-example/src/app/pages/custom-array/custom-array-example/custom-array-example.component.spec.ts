import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomArrayExampleComponent } from './custom-array-example.component';
import { FastFormsModule } from '@ngx-fast-forms/core';

describe('CustomArrayExampleComponent', () => {
  let component: CustomArrayExampleComponent;
  let fixture: ComponentFixture<CustomArrayExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FastFormsModule],
      declarations: [CustomArrayExampleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomArrayExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
