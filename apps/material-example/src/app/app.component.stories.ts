import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { AppComponent } from './app.component';
import { FastFormsModule } from '@ngx-fast-forms/core';

export default {
  title: 'AppComponent',
  component: AppComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FastFormsModule.forRoot()
      ],
    }),
  ],
} as Meta<AppComponent>;

const Template: Story<AppComponent> = (args: AppComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
