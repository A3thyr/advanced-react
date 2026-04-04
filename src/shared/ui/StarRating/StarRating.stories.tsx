import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Theme } from "@/app/providers/theme-provider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StarRating } from "./StarRating";

export default {
  title: "shared/StarRating",
  component: StarRating,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => (
  <StarRating {...args} />
);

export const Light = Template.bind({});
Light.args = {};
export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
