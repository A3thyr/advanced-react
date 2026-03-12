import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from "entities/Article/model/types/article";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import EyeIcon from "shared/assets/icons/eye-20-20.svg";
import { RoutePath } from "shared/config/router/router.config";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useHover } from "shared/lib/hooks/useHover/useHover";
import { Avatar, Button, Card, Icon, Text, ThemeButton } from "shared/ui";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
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
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(RoutePath.articles_details + article.id);
  }, [article.id, navigate]);

  const types = <Text text={article.type.join(", ")} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  // delete THAT
  console.log(isHover);

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;
    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img src={article.img} alt={article.title} className={cls.img} />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <Button onClick={onOpenArticle} theme={ThemeButton.OUTLINE}>
              {t("more")}
            </Button>
            {views}
          </div>
        </Card>
        {/* {article.title} */}
      </div>
    );
  }

  return (
    <div
      {...bindHover}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card} onClick={onOpenArticle}>
        <div className={cls.imageWrapper}>
          <img src={article.img} alt={article.title} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {/* <Text text={article.type.join(", ")} className={cls.types} /> */}
          {types}
          {views}
        </div>
        <Text title={article.title} className={cls.title} />
      </Card>
    </div>
  );
};
