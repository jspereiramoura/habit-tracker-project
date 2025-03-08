import { render, screen } from "@testing-library/react";
import Section from ".";

describe("Component: Section", () => {
  it("should render a section with title and subtitle", () => {
    render(<Section title="Awesome Title" subtitle="Awesome Subtitle" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Awesome Title" })
    ).toHaveAttribute("id", "section_awesome_title");

    expect(
      screen.getByRole("heading", { level: 2, name: "Awesome Subtitle" })
    ).toHaveAttribute("id", "section_awesome_subtitle");
  });
});
