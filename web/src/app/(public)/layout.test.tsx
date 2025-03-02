import { render, screen } from "@testing-library/react";
import PublicPagesLayout from "./layout";

describe("Layout: PublicPagesLayout", () => {
  it("should render the layout", () => {
    render(
      <PublicPagesLayout>
        <h2>MockedChildren</h2>
      </PublicPagesLayout>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "MockedChildren"
    );
  });
});
