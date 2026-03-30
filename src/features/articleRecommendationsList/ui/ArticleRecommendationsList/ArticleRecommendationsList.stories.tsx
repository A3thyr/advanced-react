import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Article } from "entities/Article";
import { StoreDecorator } from "shared/config/storybook";
import withMock from "storybook-addon-mock";
import { ArticleRecommendationsList } from "./ArticleRecommendationsList";

export default {
  title: "features/ArticleRecommendationsList",
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [withMock],
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => (
  <ArticleRecommendationsList {...args} />
);

const article: Article = {
  id: "1",
  img: "",
  blocks: [],
  createdAt: "",
  views: 123,
  type: [],
  subtitle: "",
  title: "",
  user: {
    id: "1",
    username: "1234",
  },
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/articles?_limit=3`,
      method: "GET",
      status: 200,
      response: [
        {
          ...article,
          id: "1",
        },
        {
          ...article,
          id: "2",
        },
        {
          ...article,
          id: "3",
        },
      ],
    },
  ],
};
