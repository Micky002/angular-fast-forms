import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { GeneralFormComponent } from './general-form.component';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DoubleColumnComponent } from "../util/double-column/double-column.component";

export default {
  title: 'General Form Group',
  component: GeneralFormComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FastFormsModule.forRoot(),
        MaterialFastFormsModule
      ],
      declarations: [
        DoubleColumnComponent
      ]
    })
  ]
} as Meta<GeneralFormComponent>;

const Template: Story<GeneralFormComponent> = (args: GeneralFormComponent) => ({
  props: args
});

export const singleInput = Template.bind({});
singleInput.args = {
  formDefinition: [{
    id: 'name',
    type: 'mat-input',
    label: 'Name'
  }]
};

export const row = Template.bind({});
row.args = {
  formDefinition: [{
    id: 'name',
    type: 'row',
    children: [{
      id: 'name',
      type: 'mat-input',
      label: 'Name'
    }, {
      id: 'surname',
      type: 'mat-input',
      label: 'Surname'
    }]
  }]
};

export const rowDefaultValue = Template.bind({});
rowDefaultValue.args = {
  formDefinition: [{
    id: 'name',
    type: 'row',
    children: [{
      id: 'name',
      type: 'mat-input',
      label: 'Name',
      defaultValue: 'Donald'
    }, {
      id: 'surname',
      type: 'mat-input',
      label: 'Surname',
      defaultValue: 'Duck'
    }]
  }]
};

export const validation = Template.bind({});
validation.args = {
  formDefinition: [{
    id: 'name',
    type: 'mat-input',
    label: 'Name',
    validation: {
      minLength: 6
    }
  }, {
    id: 'surname',
    type: 'mat-input',
    label: 'Surname',
    validation: {
      required: true
    }
  }]
};
