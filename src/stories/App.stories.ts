import type { Meta, StoryObj } from '@storybook/react';

import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import App from "../App";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof App> = {
  title: 'TODOLISTS/App',
  component: App,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
  decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args


export const AppStory: Story = {
}