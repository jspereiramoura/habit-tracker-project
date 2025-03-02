import { render, screen } from "@testing-library/react";
import ChangeDateControls from ".";
import { ComponentProps } from "react";
import { vi } from "vitest";

function renderTest(
  partialProps: Partial<ComponentProps<typeof ChangeDateControls>> = {}
) {
  const props: ComponentProps<typeof ChangeDateControls> = {
    currentDate: new Date(2025, 3, 2),
    onChangeDate: () => {},
    ...partialProps
  };

  return render(<ChangeDateControls {...props} />);
}

describe("ChangeDateControls", () => {
  it("should render the component", () => {
    renderTest();
    expect(screen.getByRole("region")).toHaveAccessibleName(
      /controles de hábitos/i
    );
    expect(
      screen.getByRole("button", { name: /dia anterior/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /adicionar novo hábito/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /dia anterior/i })
    ).toBeInTheDocument();
  });

  it("should handle previous date change", () => {
    const onChangeDate = vi.fn();
    renderTest({ onChangeDate });

    const previousButton = screen.getByRole("button", { name: /dia anterior/i });
    previousButton.click();

    expect(onChangeDate).toHaveBeenCalledWith(new Date(2025, 3, 1));
  });

  it("should handle next date change", () => {
    const onChangeDate = vi.fn();
    renderTest({ onChangeDate });

    const nextButton = screen.getByRole("button", { name: /próximo dia/i });
    nextButton.click();

    expect(onChangeDate).toHaveBeenCalledWith(new Date(2025, 3, 3));
  });

  it("should handle add new habit", () => {
    const addNewHabit = vi.fn();
    renderTest({ addNewHabit });

    const addButton = screen.getByRole("button", { name: /adicionar novo hábito/i });
    addButton.click();

    expect(addNewHabit).toHaveBeenCalled();
  });
});
