import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import avatar from "shared/assets/tests/storybook.jpg";
import { ProfileCard } from "./ProfileCard";

export default {
  title: "entities/ProfileCard",
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: "Unknown",
    age: 19,
    country: Country.Kazakhstan,
    lastname: "Something",
    first: "Someone",
    city: "sddfa",
    currency: Currency.EUR,
    avatar,
  },
};

export const withError = Template.bind({});
withError.args = {
  error: "true",
};

export const isLoading = Template.bind({});
isLoading.args = {
  isLoading: true,
};
