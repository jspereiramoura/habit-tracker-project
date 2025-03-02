import { screen } from "@testing-library/dom";
import { renderWithProviders } from "../../../test/utils/renderWithProviders";
import ModalContainer from "./modalContainer";
import userEvent from "@testing-library/user-event";

describe("Components: ModalContainer", () => {
  it("should render the modal component", () => {
    renderWithProviders(<ModalContainer />, {
      preloadedState: {
        modal: { open: true, title: "Title", description: "Description" }
      }
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should not render the modal component", () => {
    renderWithProviders(<ModalContainer />, {
      preloadedState: {
        modal: { open: false, title: "Title", description: "Description" }
      }
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should call close modal action", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ModalContainer />, {
      preloadedState: {
        modal: { open: true, title: "Title", description: "Description" }
      }
    });

    const closeButton = screen.getByRole("button", { name: /fechar/i });
    await user.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
