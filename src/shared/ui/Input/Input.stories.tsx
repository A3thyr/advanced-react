import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Theme } from "app/providers/theme-provider";
import { ThemeDecorator } from "shared/config/storybook";
import { Input } from "./Input";

export default {
  title: "shared/Input",
  component: Input,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: "Placeholder",
  value: "cho to",
};

export const Dark = Template.bind({});
Dark.args = {
  placeholder: "Placeholder",
  value: "cho to",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
