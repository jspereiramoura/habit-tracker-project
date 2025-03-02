import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Mock, vi } from "vitest";
import * as habitsService from "../../../../../redux/services/habits";
import { renderWithProviders } from "../../../../../test/utils/renderWithProviders";
import HabitCard from "./index";

vi.mock("../../../../../redux/services/habits.ts", { spy: true });

const TestWrapper = () => (
  <HabitCard
    id="1"
    habitId="1"
    completed={false}
    name="Test Habit"
    tags={["tag1", "tag2"]}
  />
);

beforeEach(() => {
  vi.resetAllMocks();
});

describe("HabitCard", () => {
  it("should render the habit name and tags", () => {
    renderWithProviders(<TestWrapper />);
    expect(screen.getByText("Test Habit")).toBeInTheDocument();
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
  });

  it("should call update mutation when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const updateMutation = vi.fn();
    (habitsService.useUpdateHabitLogMutation as Mock).mockReturnValue([
      updateMutation
    ]);

    renderWithProviders(<TestWrapper />);

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    expect(updateMutation).toHaveBeenCalledTimes(1);
  });

  it("should call delete mutation when delete button is clicked", async () => {
    const user = userEvent.setup();
    const deleteMutation = vi.fn();
    (habitsService.useDeleteHabitMutation as Mock).mockReturnValue([
      deleteMutation
    ]);

    renderWithProviders(<TestWrapper />);
    const deleteButton = screen.getByLabelText(`Deletar Hábito Test Habit`);

    await user.click(deleteButton);
    expect(deleteMutation).toHaveBeenCalledTimes(1);
  });

  it("should not call update mutation when delete button is focused and Enter key is pressed", async () => {
    const user = userEvent.setup();
    const updateMutation = vi.fn();
    (habitsService.useUpdateHabitMutation as Mock).mockReturnValue([
      updateMutation
    ]);

    renderWithProviders(<TestWrapper />);
    const deleteButton = screen.getByLabelText(`Deletar Hábito Test Habit`);

    await user.type(deleteButton, "{enter}");

    expect(updateMutation).not.toHaveBeenCalled();
  });

  it("should call onChangeStatus when Enter key is pressed", async () => {
    const user = userEvent.setup();
    const updateMutation = vi.fn();
    (habitsService.useUpdateHabitLogMutation as Mock).mockReturnValue([
      updateMutation
    ]);

    renderWithProviders(<TestWrapper />);
    const label = screen.getByLabelText(`Ações do Hábito Test Habit`);

    await user.type(label, "{enter}");
    expect(updateMutation).toHaveBeenCalledWith({
      id: "1",
      status: "completed"
    });
  });
});
