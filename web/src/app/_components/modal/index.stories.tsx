import { Meta, StoryObj } from "@storybook/react";
import Modal from ".";
import ReduxWrapper from "../../../../.storybook/decorators/ReduxWrapper";
import { ModalBodyTypes } from "./enum";

const meta: Meta<typeof Modal> = {
  title: "Atoms/Modal",
  component: Modal,
  decorators: [ReduxWrapper]
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  parameters: {
    preloadedState: {
      modal: {
        open: true,
        title: "Modal Legal",
        description: "Descrição do modal",
        modalType: ModalBodyTypes.DEFAULT
      }
    }
  }
};

export const AddHabitModal: Story = {
  parameters: {
    preloadedState: {
      modal: {
        open: true,
        title: "Modal Legal",
        description: "Descrição do modal",
        modalType: ModalBodyTypes.ADD_HABIT
      }
    }
  }
};
