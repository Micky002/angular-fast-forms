import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AppComponent } from './app.component';
import { FastFormsCoreModule } from '@ngx-fast-forms/core';

export default {
  title: 'AppComponent',
  component: AppComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FastFormsCoreModule
      ],
    }),
  ],
} as Meta<AppComponent>;

const Template: Story<AppComponent> = (args: AppComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
