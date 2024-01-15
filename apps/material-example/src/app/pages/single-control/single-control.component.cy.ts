import { TestBed } from '@angular/core/testing';
import { SingleControlComponent } from './single-control.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe(SingleControlComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(SingleControlComponent, {
      add: { providers: [] },
    });
    cy.mount(SingleControlComponent, {
      declarations: [],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        FastFormsModule.forRoot(),
        MaterialFastFormsModule,
      ],
      providers: undefined,
    });
  });

  it('should render single control', () => {
    cy.testId('test').should('be.visible');
  });
});
