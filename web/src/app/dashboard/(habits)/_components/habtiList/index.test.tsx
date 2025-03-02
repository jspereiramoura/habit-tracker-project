import { screen } from "@testing-library/react";
import HabitLogList from ".";
import { mockedHabitLogs } from "../../../../../test/msw/handlers/habitLogs/mockedHabitLogs";
import { renderWithProviders } from "../../../../../test/utils/renderWithProviders";

describe("HabitList", () => {
  it("should render a list of HabitCards", () => {
    renderWithProviders(
      <HabitLogList ariaLabel="Lista de Hábitos" logs={mockedHabitLogs} />
    );
    const habitList = screen.getByRole("list", { name: "Lista de Hábitos" });
    expect(habitList).toMatchSnapshot();
  });
});
