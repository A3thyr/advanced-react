import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ArticleList } from "./ArticleList";

export default {
  title: "entities/Article/ArticleList",
  component: ArticleList,
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => (
  <ArticleList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
