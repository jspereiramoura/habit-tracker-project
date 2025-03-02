import { renderWithProviders } from "../../../test/utils/renderWithProviders";
import { screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { vi } from "vitest";
import Header from ".";

describe("Components: Header", () => {
  it("should render the header", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    renderWithProviders(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /owl habit tracker/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /links de autenticação/i })
    ).toBeInTheDocument();
  });

  it("should show register links when pathname is /", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    renderWithProviders(<Header />);

    expect(screen.getByRole("link", { name: /entrar/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /registrar/i })
    ).toBeInTheDocument();
  });

  it("should not show register links when pathname is not /", () => {
    vi.mocked(usePathname).mockReturnValue("/dashboard");

    renderWithProviders(<Header />);

    expect(
      screen.queryByRole("link", { name: /entrar/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /registrar/i })
    ).not.toBeInTheDocument();
  });
});
