import { Story } from "@storybook/react";
import { Theme } from "@/shared/const/theme";
// очередной edge case, вообще, здесь нет бизнес логики, поэтому подобные частные случаи(ищи в коде) можно считать исключением
// eslint-disable-next-line aetherys-custom-plugin/layer-imports
import { ThemeProvider } from "@/app/providers/theme-provider";

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => {
  return (
    <ThemeProvider initialTheme={theme}>
      <div className={`app ${theme}`}>
        <StoryComponent />
      </div>
    </ThemeProvider>
  );
};
