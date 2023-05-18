import type { Meta, StoryObj } from '@storybook/react';

import { EditableSpan } from '../EditableSpan';
import {action} from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLISTS/EditableSpan',
  component: EditableSpan,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

  args: {
    onChange: action('change editable span value'),
    value: 'default value'
  }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {}


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
