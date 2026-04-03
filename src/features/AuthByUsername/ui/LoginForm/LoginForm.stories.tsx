import { ComponentMeta, ComponentStory } from "@storybook/react";
import { StoreDecorator } from "@/shared/config/storybook";
import LoginForm from "./LoginForm";

export default {
  title: "features/LoginForm",
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <LoginForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  StoreDecorator({
    loginForm: { username: "asdas", password: "124514" },
  }),
];

export const withError = Template.bind({});
withError.args = {};
withError.decorators = [
  StoreDecorator({
    loginForm: { username: "asdas", password: "124514", error: "ERROR" },
  }),
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
  StoreDecorator({
    loginForm: { isLoading: true },
  }),
];

// export const Dark = Template.bind({});
// Dark.args = {};
// Dark.decorators = [
//   ThemeDecorator(Theme.DARK),
//   StoreDecorator({
//     loginForm: { username: "asdas", password: "124514" },
//   }),
// ];
