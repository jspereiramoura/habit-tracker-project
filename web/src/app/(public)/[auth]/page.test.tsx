import * as vi from "vitest";
import { renderWithProviders } from "../../../test/utils/renderWithProviders";
import LoginPage from "./page";
import { useParams } from "next/navigation";
import { screen } from "@testing-library/dom";

describe("Page: Login Page", () => {
  function mockUseParams(auth: string) {
    (useParams as vi.Mock).mockReturnValue({ auth });
  }
  it.each`
    auth           | name          | title          | secondaryLink
    ${"entrar"}    | ${"Login"}    | ${"Entrar"}    | ${{ href: "/registrar", text: /para criar uma conta clique aqui/i }}
    ${"registrar"} | ${"Registro"} | ${"Registrar"} | ${{ href: "/entrar", text: /para entrar com uma conta existente clique aqui/i }}
  `(
    "should render the page as $auth",
    ({ auth, name, title, secondaryLink }) => {
      mockUseParams(auth);
      renderWithProviders(<LoginPage />);
      expect(screen.getByRole("region")).toHaveAccessibleName(
        "Sessão de " + name
      );

      expect(screen.getByRole("heading")).toHaveAccessibleName(title);

      const secondaryLinkEl = screen.getByRole("link");
      expect(secondaryLinkEl).toHaveAccessibleName(secondaryLink.text);
      expect(secondaryLinkEl).toHaveAttribute("href", secondaryLink.href);
    }
  );
});
