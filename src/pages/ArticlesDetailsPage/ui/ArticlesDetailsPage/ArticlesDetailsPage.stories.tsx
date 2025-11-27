import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Theme } from "app/providers/theme-provider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import ArticlesDetailsPage from "./ArticlesDetailsPage";

export default {
  title: "pages/ArticlesDetailsPage",
  component: ArticlesDetailsPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticlesDetailsPage>;

const Template: ComponentStory<typeof ArticlesDetailsPage> = () => (
  <ArticlesDetailsPage />
  //    {...args}
);

export const Light = Template.bind({});
Light.args = {};
export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
