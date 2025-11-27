import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Theme } from "app/providers/theme-provider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import ArticlesPage from "./ArticlesPage";

export default {
  title: "pages/ArticlesPage",
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = () => (
  <ArticlesPage />
  //    {...args}
);

export const Light = Template.bind({});
Light.args = {};
export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
