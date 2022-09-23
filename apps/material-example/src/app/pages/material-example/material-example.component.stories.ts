import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { MaterialExampleComponent } from './material-example.component';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Material Example',
  component: MaterialExampleComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        FastFormsModule.forRoot(),
        MaterialFastFormsModule
      ],
    }),
  ],
} as Meta<MaterialExampleComponent>;

const Template: Story<MaterialExampleComponent> = (args: MaterialExampleComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  def: [{
    id: 'name',
    type: 'input',
    label: 'Name'
  }]
};
