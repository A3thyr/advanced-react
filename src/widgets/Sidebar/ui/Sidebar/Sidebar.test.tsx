import { fireEvent, screen } from "@testing-library/react";
import { renderWithTranslation } from "shared/lib/tests/renderWithTranslation.helper";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  test("should render Sidebar component", () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });
  test("Sidebar should toggle its width", () => {
    renderWithTranslation(<Sidebar />);
    const toggleBtn = screen.getByTestId("sidebar-toggle");
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    // screen.debug();
    expect(screen.getByTestId("sidebar")).toHaveClass("collapsed");
  });
});
