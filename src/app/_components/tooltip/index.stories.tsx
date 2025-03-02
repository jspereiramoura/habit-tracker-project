import { Meta, StoryObj } from "@storybook/react";
import Tooltip from ".";

const meta: Meta<typeof Tooltip> = {
  title: "Atoms/Tooltip",
  component: Tooltip
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    text: "Tooltip",
    children: "Tooltip Children",
    className: "w-fit m-8 border border-black"
  }
};
