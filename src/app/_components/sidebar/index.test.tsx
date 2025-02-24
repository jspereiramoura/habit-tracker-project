import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidebar from ".";
import { vi } from "vitest";

describe("Sidebar Component", () => {
  it("should render the sidebar with logo and title", () => {
    render(<Sidebar />);
    expect(screen.getByText("Owl Habit Tracker")).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    render(<Sidebar />);
    expect(
      screen.getByRole("link", { name: /todos hábitos/i })
    ).toHaveAttribute("href", "/dashboard");
    expect(screen.getByRole("link", { name: "Hábitos" })).toHaveAttribute(
      "href",
      "/dashboard/habits"
    );
  });

  it.only("should toggle sidebar visibility on mobile", async () => {
    vi.stubGlobal('window', { ...window, innerWidth: 375 });

    const user = userEvent.setup();

    render(<Sidebar />);

    const openButton = screen.getByRole("button", {
      name: /abrir sidebar/i
    });
    await user.click(openButton);
    expect(screen.getByTestId("sidebar")).toBeVisible();

    const closeButton = await screen.findByRole("button", {
      name: /fechar sidebar/i
    });
    await user.click(closeButton);
    expect(screen.queryByTestId("sidebar")).not.toBeVisible();
  });

  it("should apply additional class names", () => {
    render(<Sidebar className="custom-class" />);
    expect(screen.getByTestId("sidebar")).toHaveClass("custom-class");
  });
});
