import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Button, { buttonStyleStrategy } from ".";

describe("Components: Button", () => {
  it("should render a button with default props", () => {
    render(<Button content="Click me" />);
    
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(buttonStyleStrategy.PRIMARY);
  });

  it("should render a secondary button", () => {
    render(<Button as="button" content="Click me" buttonType="SECONDARY" />);
    
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass(buttonStyleStrategy.SECONDARY);
  });

  it("should render an anchor when 'as' is settled as 'a'", () => {
    render(<Button as="a" href="/test" content="Go to page" />);
    
    const link = screen.getByRole("link", { name: /go to page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("should render children if content is not provided", () => {
    render(
      <Button as="button">
        <span>Child Content</span>
      </Button>
    );
    
    expect(screen.getByText(/child content/i)).toBeInTheDocument();
  });

  it("should handle click events", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button as="button" content="Click me" onClick={handleClick} />);
    
    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should apply additional class names", () => {
    render(
      <Button as="button" content="Styled Button" className="custom-class" />
    );
    
    const button = screen.getByRole("button", { name: /styled button/i });
    expect(button).toHaveClass("custom-class");
  });
});
