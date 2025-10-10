import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Theme } from "app/providers/theme-provider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Modal } from "./Modal";

export default {
  title: "shared/Modal",
  component: Modal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, voluptatem suscipit dicta quos vel, doloribus eveniet quaerat sequi at eius numquam labore! Modi laborum animi cum cupiditate officiis maiores repellat?",
};

export const Dark = Template.bind({});
Dark.args = {
  isOpen: true,
  children:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, voluptatem suscipit dicta quos vel, doloribus eveniet quaerat sequi at eius numquam labore! Modi laborum animi cum cupiditate officiis maiores repellat?",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
