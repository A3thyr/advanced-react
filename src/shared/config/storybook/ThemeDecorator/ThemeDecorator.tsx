import { Story } from "@storybook/react";
import { Theme, ThemeProvider } from "app/providers/theme-provider";

export const ThemeDecorator = (theme: Theme) => (story: Story) => {
  return (
    <ThemeProvider initialTheme={theme}>
      <div className={`app ${theme}`}>{story}</div>
    </ThemeProvider>
  );
};
