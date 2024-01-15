import { TestBed } from '@angular/core/testing';
import { Provider } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FORM_CONTROL, QuestionDefinition } from '@ngx-fast-forms/core';
import { InputComponent } from './input.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

describe(InputComponent.name, () => {
  let control: FormControl;

  beforeEach(() => {
    TestBed.overrideComponent(InputComponent, {
      add: {
        providers: [
          {
            provide: QuestionDefinition,
            useValue: new QuestionDefinition({
              id: 'cypressTest',
              label: 'Test label',
            }),
          } as Provider,
          {
            provide: FORM_CONTROL,
            useFactory: () => {
              control = new FormControl();
              return control;
            },
          } as Provider,
        ],
      },
    });
    cy.mount(InputComponent, {
      declarations: [],
      imports: [NoopAnimationsModule, MatInputModule],
      providers: undefined,
    });
  });

  it('should show form input with label', () => {
    cy.get('[data-test-id=cypressTest]')
      .should('be.visible')
      .get('mat-label')
      .should('have.text', 'Test label');
  });
});
