import { Article, ArticleView } from "entities/Article/model/types/article";
import { FC } from "react";
import EyeIcon from "shared/assets/icons/eye-20-20.svg";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useHover } from "shared/lib/hooks/useHover/useHover";
import { Card, Icon, Text } from "shared/ui";
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
  const [isHover, bindHover] = useHover();

  // delete THAT
  console.log(isHover);

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
      {...bindHover}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <img src={article.img} alt={article.title} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          <Text text={article.type.join(", ")} className={cls.types} />
          <Text text={String(article.views)} className={cls.views} />
          <Icon Svg={EyeIcon} />
        </div>
        <Text title={article.title} className={cls.title} />
      </Card>
    </div>
  );
};
