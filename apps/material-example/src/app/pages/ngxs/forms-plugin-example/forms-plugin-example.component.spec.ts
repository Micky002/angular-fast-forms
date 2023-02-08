import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPluginExampleComponent } from './forms-plugin-example.component';
import { FastFormsModule } from '@ngx-fast-forms/core';

describe('FormsPluginExampleComponent', () => {
  let component: FormsPluginExampleComponent;
  let fixture: ComponentFixture<FormsPluginExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FastFormsModule],
      declarations: [FormsPluginExampleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormsPluginExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
