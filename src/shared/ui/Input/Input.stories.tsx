import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ThemeDecorator } from "@/shared/config/storybook";
import { Input } from "./Input";
import { Theme } from "@/shared/const/theme";

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
