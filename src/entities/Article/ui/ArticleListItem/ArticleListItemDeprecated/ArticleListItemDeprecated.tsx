import { FC } from "react";
import { useTranslation } from "react-i18next";

import EyeIcon from "@/shared/assets/icons/eye-20-20.svg";
import { getRouteArticlesDetails } from "@/shared/const/router";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { AppImage, Avatar, Card, Skeleton, Text } from "@/shared/ui";
import { AppLink } from "@/shared/ui/deprecated/AppLink/AppLink";
import { Button, ThemeButton } from "@/shared/ui/deprecated/Button/Button";
import { Icon } from "@/shared/ui/deprecated/Icon/Icon";
import { TextSize } from "@/shared/ui/deprecated/Text/Text";

import {
  ArticleBlockType,
  ArticleView,
} from "../../../model/const/articleConst";
import { ArticleTextBlock } from "../../../model/types/article";
import { ArticleTextBlockComponent } from "../../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { ArticleListItemProps } from "../ArticleListItem";
import cls from "../ArticleListItem.module.scss";

export const ArticleListItemDeprecated: FC<ArticleListItemProps> = ({
  article,
  target,
  view = ArticleView.SMALL,
  className,
}) => {
  const { t } = useTranslation();

  const types = <Text text={article.type.join(", ")} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;
    return (
      <div
        data-testid={"ArticleListItem"}
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
          <AppImage
            fallback={<Skeleton width={"100%"} height={225} />}
            src={article.img}
            alt={article.title}
            className={cls.img}
          />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <AppLink target={target} to={getRouteArticlesDetails(article.id)}>
              <Button theme={ThemeButton.OUTLINE}>{t("more")}</Button>
            </AppLink>
            {views}
          </div>
        </Card>
        {/* {article.title} */}
      </div>
    );
  }

  return (
    <AppLink
      target={target}
      to={getRouteArticlesDetails(article.id)}
      // {...bindHover}
      data-testid={"ArticleListItem"}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <AppImage
            fallback={<Skeleton width={200} height={220} />}
            src={article.img}
            alt={article.title}
            className={cls.img}
          />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {/* <Text text={article.type.join(", ")} className={cls.types} /> */}
          {types}
          {views}
        </div>
        <Text title={article.title} className={cls.title} size={TextSize.S} />
      </Card>
    </AppLink>
  );
};
