import { screen } from "@testing-library/dom";
import { renderWithProviders } from "../../../test/utils/renderWithProviders";
import DashboardStatistics from "./page";

describe("Page: DashboardStatistics", () => {
  it("should render the page correctly", () => {
    renderWithProviders(<DashboardStatistics />);

    const section = screen.getByRole("region");

    expect(section).toBeInTheDocument();
    expect(section).toHaveAccessibleName("Estatísticas");
    expect(section).toHaveAccessibleDescription("Veja como você está indo");
  });
});
