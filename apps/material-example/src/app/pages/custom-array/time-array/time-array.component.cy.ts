import { Provider } from '@angular/core';
import { FormArray } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActionService, ControlFactoryService, FastFormArray, FORM_CONTROL } from '@ngx-fast-forms/core';
import { NgxsModule } from '@ngxs/store';
import { DateTime } from 'luxon';
import { TimeArrayComponent } from './time-array.component';
import { CustomArrayModule } from '../custom-array.module';

describe(TimeArrayComponent.name, () => {
  let formArray: FormArray;

  beforeEach(() => {
    cy.mount(TimeArrayComponent, {
      declarations: [],
      imports: [NgxsModule.forRoot(), NoopAnimationsModule, CustomArrayModule],
      providers: [
        ActionService,
        {
          provide: FORM_CONTROL,
          deps: [ControlFactoryService],
          useFactory: (cf: ControlFactoryService) => {
            formArray = new FastFormArray(
              {
                id: 'group',
                type: 'group',
                children: [
                  {
                    id: 'name',
                    type: 'mat-input',
                    label: 'Name',
                  },
                  {
                    id: 'dateRange',
                    type: 'date-range',
                  },
                  {
                    id: 'actions',
                    type: 'time-array-actions',
                  },
                ],
              },
              cf,
            );
            return formArray;
          },
        } as Provider,
      ],
    });
  });

  it('should show new element button and add element', () => {
    cy.testId('entry-0', 'name')
      .should('not.exist')
      .testId('new-item')
      .click()
      .testId('entry-0', 'name')
      .should('be.visible');
  });

  it('should duplicate entry', () => {
    const now = DateTime.now();
    formArray.setValue([
      {
        name: 'Michael',
        dateRange: { from: now.toJSDate(), until: now.plus({ days: 10 }).toJSDate() },
      },
      {
        name: 'Weisgrab',
        dateRange: { from: now.plus({ days: 11 }).toJSDate(), until: now.plus({ days: 14 }).toJSDate() },
      },
      {
        name: 'Test',
        dateRange: { from: now.plus({ days: 20 }).toJSDate(), until: now.plus({ days: 22 }).toJSDate() },
      },
    ]);
    cy.get('[data-test-id=entry-1] [data-test-id=copy-action]')
      .click()
      .then(() => {
        expect(formArray).lengthOf(4);
        expect(formArray.controls[2].value).to.deep.equal({
          name: 'Weisgrab',
          dateRange: { from: now.plus({ days: 11 }).toJSDate(), until: now.plus({ days: 14 }).toJSDate() },
        });
      })
      .get('[data-test-id=entry-1] [data-test-id=name]')
      .clear()
      .type('New value')
      .then(() => {
        expect(formArray).lengthOf(4);
        expect(formArray.controls[1].get('name')?.value).to.deep.equal('New value');
      });
  });
});
