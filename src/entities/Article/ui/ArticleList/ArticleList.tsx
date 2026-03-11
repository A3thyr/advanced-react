import { Article, ArticleView } from "entities/Article/model/types/article";
import { FC } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Skeleton } from "shared/ui";
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
    return (
      <ArticleListItem
        key={article.id}
        article={article}
        view={view}
        className={cls.card}
      />
    );
  };

  if (isLoading) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className])}>
        <Skeleton width="100%" height={120} />
        <Skeleton width="100%" height={120} />
        <Skeleton width="100%" height={120} />
      </div>
    );
  }
  return (
    <div className={classNames(cls.ArticleList, {}, [className])}>
      {articles.map(renderArticle)}
    </div>
  );
};
