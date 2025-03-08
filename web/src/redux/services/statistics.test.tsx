import { renderHook, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../test/utils/renderWithProviders";
import { useGetStatisticsQuery } from "./statistics";
import { mockedStatistics } from "../../test/msw/handlers/habitStatistics/mockedHabitStatistics";

describe("Services: HabitStatistic", () => {
  it("getStatistics: should return a list of statistics", async () => {
    const { wrapper } = renderWithProviders(<></>);
    const { result } = renderHook(() => useGetStatisticsQuery(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(mockedStatistics);
    });
  });
});
