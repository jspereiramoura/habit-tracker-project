import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Page: Login Page", () => {
  it("should render correctly", () => {
    render(<Home />);

    expect(screen.getByRole("region")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName(
      /organize seus hábitos com facilidade/i
    );
    expect(screen.getByRole("link")).toHaveAccessibleName(/faça seu cadastro/i);
  });
});
