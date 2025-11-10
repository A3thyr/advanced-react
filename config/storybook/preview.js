import { addDecorator } from "@storybook/react";
import { Theme } from "../../src/app/providers/theme-provider";
import {
  RouterDecorator,
  StyleDecorator,
  ThemeDecorator,
} from "../../src/shared/config/storybook";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
// addDecorator(StoreDecorator());
