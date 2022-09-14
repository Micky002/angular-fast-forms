import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPluginExampleComponent } from './forms-plugin-example.component';

describe('FormsPluginExampleComponent', () => {
  let component: FormsPluginExampleComponent;
  let fixture: ComponentFixture<FormsPluginExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormsPluginExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormsPluginExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
