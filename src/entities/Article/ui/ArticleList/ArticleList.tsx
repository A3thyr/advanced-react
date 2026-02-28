import { Article, ArticleView } from "entities/Article/model/types/article";
import { FC } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import cls from "./ArticleList.module.scss";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

export const ArticleList: FC<ArticleListProps> = ({
  className,
  articles,
  isLoading,
  view = ArticleView.SMALL,
}) => {
  const renderArticle = (article: Article) => {
    return <ArticleListItem key={article.id} article={article} view={view} />;
  };

  return (
    <div className={classNames(cls.ArticleList, {}, [className])}>
      {articles.map(renderArticle)}
    </div>
  );
};
