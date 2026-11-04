import { FC, HTMLAttributeAnchorTarget } from "react";

import { ArticleView } from "../../model/const/articleConst";
import { Article } from "../../model/types/article";
import { ArticleListItemRedesigned } from "./ArticleListItemRedesigned/ArticleListItemRedesigned";

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = (props) => {
  return <ArticleListItemRedesigned {...props} />;
};
