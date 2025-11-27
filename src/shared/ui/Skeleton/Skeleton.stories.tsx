import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Theme } from "app/providers/theme-provider";
import { ThemeDecorator } from "shared/config/storybook";
import { Skeleton } from "./Skeleton";

export default {
  title: "shared/Skeleton",
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  width: "100%",
  height: 200,
};

export const Dark = Template.bind({});
Dark.args = {
  width: "100%",
  height: 200,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {
  width: "100%",
  height: 200,
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export const Circle = Template.bind({});
Circle.args = {
  border: "50%",
  width: 100,
  height: 100,
};
