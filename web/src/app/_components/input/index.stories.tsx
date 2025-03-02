import type { Meta, StoryObj } from "@storybook/react";

import Input from ".";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input
};

export default meta;
type Story = StoryObj<typeof Input>;

export const WithoutError: Story = {
  args: {
    type:"text",
    placeholder:"Seu melhor email",
  }
};

export const WithError: Story = {
  args: {
    type:"text",
    placeholder:"Seu melhor email",
    errorMessage:"Email inválido",
  }
};
