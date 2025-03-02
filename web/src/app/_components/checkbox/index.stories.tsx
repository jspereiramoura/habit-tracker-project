import type { Meta, StoryObj } from "@storybook/react";

import CheckBox from ".";

const meta: Meta<typeof CheckBox> = {
  title: "Atoms/CheckBox",
  component: CheckBox
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

export const Playground: Story = {
  args: {}
};
