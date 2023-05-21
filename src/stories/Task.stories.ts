import type { Meta, StoryObj } from '@storybook/react';


import {action} from "@storybook/addon-actions";
import {string} from "prop-types";
import {Task} from "../Components/Task/Task";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    task: {
      id: '1',
      title: 'task',
      isDone: false
    },
    todolistId: 'ewqferfsdg'
  },
  argTypes: {
    // changeTaskTitle: {
    //   action: 'change task title'
    // },
    // changeTaskStatus: {
    //   action: 'change task status'
    // },
    // removeTask: {
    //   action: 'remove task'
    // },
  }
};

export default meta;
type Story = StoryObj<typeof Task>;


export const TaskIsDoneStory: Story = {
  args: {
    // changeTaskStatus: action('changeTaskStatus'),
    // changeTaskTitle: action('changeTaskTitle'),
    // removeTask: action('removeTask'),
    task: {
      id: '1',
      title: 'task',
      isDone: true
    },
    todolistId: 'ewqferfsdg'
  }
}

export const TaskIsNotDoneStory: Story = {}
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
