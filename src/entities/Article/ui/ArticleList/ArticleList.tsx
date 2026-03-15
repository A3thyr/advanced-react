import { Article, ArticleView } from "entities/Article/model/types/article";
import { FC } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import cls from "./ArticleList.module.scss";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton key={index} view={view} className={cls.card} />
    ));
};

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
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {getSkeletons(view)}
      </div>
    );
  }
  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.map(renderArticle)}
    </div>
  );
};
