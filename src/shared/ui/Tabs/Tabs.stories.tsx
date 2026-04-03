import { action } from "@storybook/addon-actions";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Theme } from "@/app/providers/theme-provider";
import { ThemeDecorator } from "@/shared/config/storybook";
import { Tabs } from "./Tabs";

export default {
  title: "shared/Tabs",
  component: Tabs,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: "1",
  onTabClick: action("onTabClick"),
  tabs: [
    { value: "1", content: "IT" },
    { value: "2", content: "Наука" },
    { value: "3", content: "Экономика" },
  ],
};

export const Dark = Template.bind({});
Dark.args = {
  ...Primary.args,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
