import type { Meta, StoryObj } from "@storybook/react";
import reduxWrapperDecorator from "../../../../../../.storybook/decorators/ReduxWrapper";
import ChangeDateControls from ".";

const meta: Meta<typeof ChangeDateControls> = {
  title: "Pages/Habit/ChangeDateControls",
  component: ChangeDateControls,
  decorators: [reduxWrapperDecorator]
};

export default meta;
type Story = StoryObj<typeof ChangeDateControls>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <div className="w-full h-full mt-24 flex justify-center items-center">
      <ChangeDateControls {...args} />
    </div>
  ),
  args: {
    addNewHabit: () => {
      alert("New habit added");
    },
    currentDate: new Date(),
    onChangeDate: newDate => {
      alert(newDate);
    }
  }
};
