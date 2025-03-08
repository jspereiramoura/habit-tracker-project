import { render, screen } from "@testing-library/react";
import HabitStatisticsCard from ".";
import { mockedStatistics } from "../../../../../test/msw/handlers/habitStatistics/mockedHabitStatistics";
import { mockedHabits } from "../../../../../test/msw/handlers/habits/mockedHabits";

describe("Components: HabitStatisticsCard", () => {
  const mockedProps = {
    habit: mockedHabits[0],
    statistics: mockedStatistics
  };

  it("should render the habit name", () => {
    render(<HabitStatisticsCard {...mockedProps} />);

    expect(
      screen.getByRole("heading", { level: 2, name: mockedProps.habit.name })
    ).toBeInTheDocument();
  });

  it("should render the habit statistics correctly", () => {
    render(<HabitStatisticsCard {...mockedProps} />);

    for (const statistic of [
      "Sequência Atual",
      "Sequência Máxima",
      "Total de Conclusões",
      "Taxa de Conclusão"
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name: statistic })
      ).toBeInTheDocument();
    }


    for (const statistic of [
      mockedStatistics.streakCurrent,
      mockedStatistics.streakLongest,
      mockedStatistics.completedLogs,
      `${mockedStatistics.completionRate.toFixed(2)}%`
    ]) {
      expect(screen.getByText(statistic)).toBeInTheDocument();
    }
  });
});
