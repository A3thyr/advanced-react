import { fireEvent, screen, waitFor } from "@testing-library/react";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  test("should render Sidebar component", async () => {
    componentRender(<Sidebar />);

    await waitFor(() => {
      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });
  });
  test("Sidebar should toggle its width", async () => {
    componentRender(<Sidebar />);

    await waitFor(() => {
      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });

    const toggleBtn = screen.getByTestId("sidebar-toggle");

    fireEvent.click(toggleBtn);
    // screen.debug();
    expect(screen.getByTestId("sidebar")).toHaveClass("collapsed");
  });
});
