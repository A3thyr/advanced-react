import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Flex } from "./Flex";

export default {
  title: "shared/Flex",
  component: Flex,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
  children: (
    <>
      <div className="">text</div>
      <div className="">text</div>
      <div className="">text</div>
      <div className="">text</div>
    </>
  ),
};

export const Column = Template.bind({});
Column.args = {
  direction: "column",
  children: (
    <>
      <div className="">text</div>
      <div className="">text</div>
      <div className="">text</div>
      <div className="">text</div>
    </>
  ),
};

export const RowGap4 = Template.bind({});
RowGap4.args = {
  gap: 4,
  children: (
    <>
      <div className="">text</div>
      <div className="">text</div>
      <div className="">text</div>
      <div className="">text</div>
    </>
  ),
};

export const ColumnGap4 = Template.bind({});
ColumnGap4.args = {
  direction: "column",
  gap: 4,
  children: (
    <>
      <div className="">text</div>
      <div className="">text</div>
      <div className="">text</div>
      <div className="">text</div>
    </>
  ),
};
