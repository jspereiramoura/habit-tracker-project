import { render, screen } from "@testing-library/react";
import Modal from ".";
import { vi } from "vitest";

describe("Components: Modal", () => {
  it("should render the modal", () => {
    render(
      <Modal
        open
        handleCloseModal={vi.fn()}
        title="Test Modal"
        description="Awesome Description"
      />
    );

    const dialog = screen.getByRole("dialog");

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAccessibleName("Test Modal");
    expect(dialog).toHaveAccessibleDescription("Awesome Description");
    expect(screen.getByRole("button", { name: /fechar/i })).toBeInTheDocument();
  });

  it("should render the modal with dialog closed", () => {
    render(
      <Modal
        open={false}
        handleCloseModal={vi.fn()}
        title="Test Modal"
        description="Awesome Description"
      />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should close the modal", () => {
    const handleCloseModal = vi.fn();
    render(
      <Modal
        open
        handleCloseModal={handleCloseModal}
        title="Test Modal"
        description="Awesome Description"
      />
    );

    const button = screen.getByRole("button", { name: /fechar/i });
    button.click();

    expect(handleCloseModal).toHaveBeenCalledTimes(1);
  });
});
