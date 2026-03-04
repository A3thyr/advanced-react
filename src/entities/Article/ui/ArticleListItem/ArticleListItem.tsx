import { Article, ArticleView } from "entities/Article/model/types/article";
import { FC } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Text } from "shared/ui";
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
  if (view === ArticleView.BIG) {
    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        {article.title}
      </div>
    );
  }

  return (
    <div
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <div className={cls.card}>
        <div className={cls.imageWrapper}>
          <img src={article.img} alt="" />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          <Text text={article.type.join(", ")} className={cls.types} />
          <Text text={String(article.views)} className={cls.views} />
        </div>
      </div>
    </div>
  );
};
