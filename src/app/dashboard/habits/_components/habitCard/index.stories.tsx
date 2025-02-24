import type { Meta, StoryObj } from '@storybook/react';
 
import HabitCard from '.'; 
 
const meta: Meta<typeof HabitCard> = {
  title: 'Components/HabitCard',
  component: HabitCard,
};
 
export default meta;
type Story = StoryObj<typeof HabitCard>;

export const WithTags: Story = {
  args: {
    name: 'Read a book',
    tags: ['Reading', 'Books'],
    completed: false,
  },
};

export const WithoutTags: Story = {
  args: {
    name: 'Read a book',
    tags: [],
    completed: false,
  },
};
