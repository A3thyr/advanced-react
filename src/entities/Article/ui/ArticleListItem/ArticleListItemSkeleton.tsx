import { ArticleView } from "entities/Article/model/types/article";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./ArticleListItem.module.scss";

interface ArticleListItemSkeletonProps {
  className?: string;
  view?: ArticleView;
}

export const ArticleListItemSkeleton = (
  props: ArticleListItemSkeletonProps,
) => {
  const { view = ArticleView.SMALL, className } = props;
  if (view === ArticleView.BIG) {
    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <div className={cls.card}>
          <div className={cls.header}>
            <div />
            <div className={cls.username} />
            <div className={cls.date} />
          </div>
          <div className={cls.title} />
          <div className={cls.img} />

          <div className={cls.footer}>
            <div />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <div className={cls.card}>
        <div className={cls.imageWrapper}>
          <div className={cls.img} />
          <div className={cls.date} />
        </div>
        <div className={cls.infoWrapper} />

        <div className={cls.title} />
      </div>
    </div>
  );
};
