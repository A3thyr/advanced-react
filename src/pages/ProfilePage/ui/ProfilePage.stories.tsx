import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Theme } from "@/app/providers/theme-provider";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { StoreDecorator } from "@/shared/config/storybook";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import ProfilePage from "./ProfilePage";

export default {
  title: "pages/ProfilePage",
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => (
  <ProfilePage />
  //   {...args}
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
  StoreDecorator({
    profile: {
      form: {
        username: "Unknown",
        age: 19,
        country: Country.Kazakhstan,
        lastname: "Something",
        first: "Someone",
        city: "sddfa",
        currency: Currency.EUR,
      },
    },
  }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      form: {
        username: "Unknown",
        age: 19,
        country: Country.Kazakhstan,
        lastname: "Something",
        first: "Someone",
        city: "sddfa",
        currency: Currency.EUR,
      },
    },
  }),
];
