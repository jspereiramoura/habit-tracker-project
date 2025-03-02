import type { Meta, StoryObj } from "@storybook/react";
import reduxWrapperDecorator from "../../../../../../.storybook/decorators/ReduxWrapper";

import HabitCard from ".";

const meta: Meta<typeof HabitCard> = {
  title: "Pages/Habit/HabitCard",
  component: HabitCard,
  decorators: [reduxWrapperDecorator]
};

export default meta;
type Story = StoryObj<typeof HabitCard>;

export const WithTags: Story = {
  args: {
    name: "Read a book",
    tags: ["Reading", "Books"],
    completed: false
  }
};

export const WithoutTags: Story = {
  args: {
    name: "Read a book",
    tags: [],
    completed: false
  }
};
