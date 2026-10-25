import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ListBox } from "./ListBox";

export default {
  title: "shared/ListBox",
  component: ListBox,
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
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
  <ListBox {...args} />
);

export const TopRight = Template.bind({});
TopRight.args = {
  direction: "top right",
  items: [
    { value: "asikfoajfioajfsd", content: "asikfoajfioajfsd" },
    { value: "fjsdkgsdkgskdgjksd", content: "fjsdkgsdkgskdgjksd" },
    { value: "asdljfgksdgkpsdgksdgksdg", content: "asdljfgksdgkpsdgksdgksdg" },
  ],
  defaultValue: "fjsdkgsdkgskdgjksd",
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  direction: "top left",
  items: [
    { value: "asikfoajfioajfsd", content: "asikfoajfioajfsd" },
    { value: "fjsdkgsdkgskdgjksd", content: "fjsdkgsdkgskdgjksd" },
    { value: "asdljfgksdgkpsdgksdgksdg", content: "asdljfgksdgkpsdgksdgksdg" },
  ],
  defaultValue: "fjsdkgsdkgskdgjksd",
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  direction: "bottom left",
  items: [
    { value: "asikfoajfioajfsd", content: "asikfoajfioajfsd" },
    { value: "fjsdkgsdkgskdgjksd", content: "fjsdkgsdkgskdgjksd" },
    { value: "asdljfgksdgkpsdgksdgksdg", content: "asdljfgksdgkpsdgksdgksdg" },
  ],
  defaultValue: "fjsdkgsdkgskdgjksd",
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  direction: "bottom right",
  items: [
    { value: "asikfoajfioajfsd", content: "asikfoajfioajfsd" },
    { value: "fjsdkgsdkgskdgjksd", content: "fjsdkgsdkgskdgjksd" },
    { value: "asdljfgksdgkpsdgksdgksdg", content: "asdljfgksdgkpsdgksdgksdg" },
  ],
  defaultValue: "fjsdkgsdkgskdgjksd",
};
