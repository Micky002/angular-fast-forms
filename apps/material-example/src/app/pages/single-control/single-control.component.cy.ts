import { mount } from 'cypress/angular';
import { SingleControlComponent } from './single-control.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe(SingleControlComponent.name, () => {

  beforeEach(() => {
    mount(SingleControlComponent, {
      declarations: [],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        FastFormsModule.forRoot(),
        MaterialFastFormsModule
      ],
      providers: []
    });
  });

  it('should render single control', () => {
    cy.testId('test').should('be.visible');
  });
});
