import { render, screen } from "@testing-library/react";
import Tooltip from ".";

describe("Components: Tooltip", () => {
  it("should render the tooltip", () => {
    render(<Tooltip text="Tooltip helper text">Tooltip Children</Tooltip>);
    expect(screen.getByText("Tooltip Children")).toBeInTheDocument();

    const tooltip = screen.getByText("Tooltip helper text");

    expect(tooltip).toBeInTheDocument();
    expect(tooltip.classList).toContain("opacity-0");
    expect(tooltip.classList).toContain("group-hover:opacity-100");
  });
});
