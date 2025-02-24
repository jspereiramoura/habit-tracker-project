import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { vi } from "vitest";
import HabitCard from "./index";

describe("HabitCard", () => {
  let defaultProps: ComponentProps<typeof HabitCard>;

  beforeEach(() => {
    defaultProps = {
      name: "Test Habit",
      tags: ["tag1", "tag2"],
      completed: false,
      onDelete: vi.fn(),
      onChangeStatus: vi.fn()
    };
  });

  it("should render the habit name and tags", () => {
    render(<HabitCard {...defaultProps} />);
    expect(screen.getByText("Test Habit")).toBeInTheDocument();
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
  });

  it("should call onChangeStatus when checkbox is clicked", async () => {
    const user = userEvent.setup();

    render(<HabitCard {...defaultProps} />);

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    expect(defaultProps.onChangeStatus).toHaveBeenCalledWith(true);
  });

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();

    render(<HabitCard {...defaultProps} />);
    const deleteButton = screen.getByLabelText(
      `Deletar Hábito ${defaultProps.name}`
    );

    await user.click(deleteButton);

    expect(defaultProps.onDelete).toHaveBeenCalled();
  });

  it("should not call onChangeStatus when delete button is focused and Enter key is pressed", async () => {
    const user = userEvent.setup();

    render(<HabitCard {...defaultProps} />);
    const deleteButton = screen.getByLabelText(
      `Deletar Hábito ${defaultProps.name}`
    );

    await user.type(deleteButton, "{enter}");

    expect(defaultProps.onChangeStatus).not.toHaveBeenCalled();
  });

  it("should call onChangeStatus when Enter key is pressed", async () => {
    const user = userEvent.setup();

    render(<HabitCard {...defaultProps} />);
    const label = screen.getByLabelText(`Ações do Hábito ${defaultProps.name}`);

    await user.type(label, "{enter}");

    expect(defaultProps.onChangeStatus).toHaveBeenCalledWith(true);
  });
});
