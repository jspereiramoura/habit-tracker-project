import { screen, within } from "@testing-library/dom";
import { vi } from "vitest";
import Modal from ".";
import { ModalProps } from "../../../redux/slices/modalSlice";
import { renderWithProviders } from "../../../test/utils/renderWithProviders";
import { ModalBodyTypes } from "./templates";

function renderTest(partialModalProps: Partial<ModalProps> = {}) {
  renderWithProviders(<Modal />, {
    preloadedState: {
      modal: {
        open: true,
        title: "Modal Legal",
        description: "Descrição do modal",
        modalType: ModalBodyTypes.DEFAULT,
        ...partialModalProps
      }
    }
  });
}

describe("Modal component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the modal with the title and description", () => {
    renderTest();

    const dialog = screen.getByRole("dialog");

    expect(dialog).toHaveAccessibleName("Modal Legal");
    expect(dialog).toHaveAccessibleDescription("Descrição do modal");
  });

  it("should render the modal with the title only", () => {
    renderTest({ description: "" });

    const dialog = screen.getByRole("dialog");

    expect(dialog).toHaveAccessibleName("Modal Legal");
    expect(dialog).not.toHaveAccessibleDescription();
  });

  it("should render the modal with correct template", () => {
    renderTest({ modalType: ModalBodyTypes.ADD_HABIT });

    const dialog = screen.getByRole("dialog");

    expect(
      within(dialog).getByRole("textbox", { name: /Nome do hábito/i })
    ).toBeInTheDocument();
  });

  it("should not render the modal when it's closed", () => {
    renderTest({ open: false });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
