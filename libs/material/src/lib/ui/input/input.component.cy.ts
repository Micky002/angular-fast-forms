import { Provider } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FORM_CONTROL, QuestionDefinition } from '@ngx-fast-forms/core';
import { mount } from 'cypress/angular';
import { InputComponent } from './input.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

describe(InputComponent.name, () => {
  let control: FormControl;

  beforeEach(() => {
    mount(InputComponent, {
      declarations: [],
      imports: [NoopAnimationsModule, MatInputModule],
      providers: [
        {
          provide: QuestionDefinition,
          useValue: new QuestionDefinition({
            id: 'cypressTest',
            type: 'mat-input',
            label: 'Test label'
          })
        } as Provider,
        {
          provide: FORM_CONTROL,
          useFactory: () => {
            control = new FormControl();
            return control;
          }
        } as Provider
      ]
    });
  });

  it('should show form input with label', () => {
    cy.get('[data-test-id=cypressTest]').should('be.visible')
        .get('mat-label').should('have.text', 'Test label');
  });
});
