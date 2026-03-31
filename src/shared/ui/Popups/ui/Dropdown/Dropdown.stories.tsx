import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import { Button } from "../../../Button/Button";

export default {
  title: "shared/Dropdown",
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 100 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  direction: "bottom left",
  trigger: <Button>Open dropdown</Button>,
  items: [
    {
      content: "first",
    },
    {
      content: "second",
    },
    {
      content: "third",
    },
  ],
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  direction: "bottom right",
  trigger: <Button>Open dropdown</Button>,
  items: [
    {
      content: "first",
    },
    {
      content: "second",
    },
    {
      content: "third",
    },
  ],
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  direction: "top left",
  trigger: <Button>Open dropdown</Button>,
  items: [
    {
      content: "first",
    },
    {
      content: "second",
    },
    {
      content: "third",
    },
  ],
};

export const TopRight = Template.bind({});
TopRight.args = {
  direction: "top right",
  trigger: <Button>Open dropdown</Button>,
  items: [
    {
      content: "first",
    },
    {
      content: "second",
    },
    {
      content: "third",
    },
  ],
};
