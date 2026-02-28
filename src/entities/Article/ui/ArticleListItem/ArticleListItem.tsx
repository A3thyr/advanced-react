import { Article, ArticleView } from "entities/Article/model/types/article";
import { FC } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./ArticleListItem.module.scss";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view?: ArticleView;
}

export const ArticleListItem: FC<ArticleListItemProps> = ({
  className,
  article,
  view = ArticleView.SMALL,
}) => {
  return (
    <div className={classNames(cls.ArticleListItem, {}, [className])}>
      {article.title}
    </div>
  );
};
