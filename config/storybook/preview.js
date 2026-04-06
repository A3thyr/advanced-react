import { addDecorator } from "@storybook/react";
import {
  RouterDecorator,
  StyleDecorator,
  SuspenseDecorator,
  ThemeDecorator,
} from "../../src/shared/config/storybook";
import { Theme } from "../../src/shared/const/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
  themes: {
    default: "dark",
    list: [
      { name: "light", class: Theme.LIGHT, color: "#ffffff" },
      { name: "dark", class: Theme.DARK, color: "#000000" },
      { name: "orange", class: Theme.ORANGE, color: "#ffb805" },
    ],
  },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
// addDecorator(StoreDecorator());
