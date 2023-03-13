import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { FormsPluginExampleComponent } from './forms-plugin-example.component';
import { FastFormsModule } from '@ngx-fast-forms/core';

describe('FormsPluginExampleComponent', () => {
  let component: FormsPluginExampleComponent;
  let fixture: ComponentFixture<FormsPluginExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormsPluginExampleComponent],
      imports: [
        FastFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormsPluginExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
