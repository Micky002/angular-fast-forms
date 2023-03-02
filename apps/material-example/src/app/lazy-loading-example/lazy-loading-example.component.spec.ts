import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { LazyLoadingExampleComponent } from './lazy-loading-example.component';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { FastFormsModule } from '@ngx-fast-forms/core';

describe('LazyLoadingExampleComponent', () => {
  let component: LazyLoadingExampleComponent;
  let fixture: ComponentFixture<LazyLoadingExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FastFormsModule,
        MaterialFastFormsModule
      ],
      declarations: [
        LazyLoadingExampleComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LazyLoadingExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
