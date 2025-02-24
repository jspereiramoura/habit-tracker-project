import type { Meta, StoryObj } from "@storybook/react";

import Section from ".";

const meta: Meta<typeof Section> = {
  title: "Atoms/Section",
  component: Section
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Playground: Story = {
  args: {
    title: "Section Title",
    subtitle: "Section Subtitle",
    children: "Section Content"
  }
};
