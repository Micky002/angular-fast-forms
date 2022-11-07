import { mount } from 'cypress/angular';
import { TimeArrayComponent } from './time-array.component';
import { Provider } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { FormArray } from '@angular/forms';
import { DateTime } from 'luxon';
import { MatIconModule } from '@angular/material/icon';
import { CustomArrayModule } from '../custom-array.module';
import { ActionService, ControlFactoryService, CONTROL_PROPERTIES, FastFormArray, FastFormsModule, FORM_CONTROL } from '@ngx-fast-forms/core';

describe(TimeArrayComponent.name, () => {
  let formArray: FormArray;

  beforeEach(() => {
    mount(TimeArrayComponent, {
      declarations: [],
      imports: [
        FastFormsModule.forRoot(),
        NgxsModule.forRoot(),
        NoopAnimationsModule,
        MatIconModule,
        CustomArrayModule
      ],
      providers: [
        ActionService,
        {
          provide: FORM_CONTROL,
          deps: [ControlFactoryService],
          useFactory: (cf: ControlFactoryService) => {
            formArray = new FastFormArray({
              id: 'group',
              type: 'group',
              children: [
                {
                  id: 'name',
                  type: 'mat-input',
                  label: 'Name'
                },
                {
                  id: 'dateRange',
                  type: 'date-range'
                },
                {
                  id: 'actions',
                  type: 'time-array-actions'
                }
              ]
            }, cf);
            return formArray;
          }
        } as Provider,
        {
          provide: CONTROL_PROPERTIES,
          useValue: {
            newButtonLabel: 'Preis hinzufügen'
          }
        } as Provider
      ]
    });

  });

  it('should show new element button and add element', () => {
    cy.get('[data-test-id=new-item]').click();
    cy.get('input').should('be.visible');
  });

  it.only('should duplicate entry', () => {
    const now = DateTime.now();
    formArray.setValue([
      {name: 'Michael', dateRange: {from: now.toJSDate(), until: now.plus({days: 10}).toJSDate()}},
      {name: 'Weisgrab', dateRange: {from: now.plus({days: 11}).toJSDate(), until: now.plus({days: 14}).toJSDate()}}
    ]);
    // cy.get('[data-test-id=entry-1] [data-test-id=add-action]').click();
    // cy.get('[data-test-id=new-item]').click();
    // cy.get('input').should('be.visible');
  });
});

