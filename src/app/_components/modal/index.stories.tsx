import { Meta, StoryObj } from "@storybook/react";
import Modal from ".";
import ReduxWrapper from "../../../../.storybook/decorators/ReduxWrapper";

const meta: Meta<typeof Modal> = {
  title: "Atoms/Modal",
  component: Modal,
  decorators: [ReduxWrapper]
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Playground: Story = {
  args: {
    open: true,
    title: "Modal Legal",
    description: "Descrição do modal"
  }
};
