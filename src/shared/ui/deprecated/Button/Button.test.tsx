import { render, screen } from "@testing-library/react";
import { Button, ThemeButton } from "./Button";

describe("Button", () => {
  test("should render Button component", () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText("TEST")).toBeInTheDocument();
  });

  test("should render Button component with CLEAR theme", () => {
    render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
    screen.debug();
    expect(screen.getByText("TEST")).toHaveClass("clear");
  });
});
