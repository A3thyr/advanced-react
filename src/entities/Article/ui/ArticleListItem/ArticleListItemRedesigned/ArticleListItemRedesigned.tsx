import { FC } from "react";
import { useTranslation } from "react-i18next";

import {
  ArticleBlockType,
  ArticleView,
} from "../../../model/const/articleConst";
import { ArticleTextBlock } from "../../../model/types/article";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import { getRouteArticlesDetails } from "@/shared/const/router";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { AppImage, AppLink, Button, Icon, Skeleton } from "@/shared/ui";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { ArticleListItemProps } from "../ArticleListItem";
import cls from "./ArticleListItemRedesigned.module.scss";

export const ArticleListItemRedesigned: FC<ArticleListItemProps> = ({
  article,
  target,
  view = ArticleView.SMALL,
  className,
}) => {
  const { t } = useTranslation("article_details");

  const types = <Text text={article.type.join(", ")} className={cls.types} />;
  const views = (
    <HStack gap={8} align="center">
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.views} />
    </HStack>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;
    return (
      <Card
        padding={24}
        max
        data-testid={"ArticleListItem"}
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <VStack max gap={16}>
          <HStack gap={8} max>
            <Avatar size={30} src={article.user.avatar} />
            <Text bold text={article.user.username} />
            <Text text={article.createdAt} />
          </HStack>
          <Text title={article.title} bold />
          <Text title={article.subtitle} size="s" />
          <AppImage
            fallback={<Skeleton width={"100%"} height={225} />}
            src={article.img}
            alt={article.title}
            className={cls.img}
          />
          {textBlock?.paragraphs && (
            <Text
              text={textBlock.paragraphs.slice(0, 2).join(" ")}
              className={cls.textBlock}
            />
          )}
          <HStack max justfify="between" align="center">
            <AppLink target={target} to={getRouteArticlesDetails(article.id)}>
              <Button variant={"outline"}>{t("more")}</Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>

        {/* <div className={cls.footer}></div> */}
      </Card>
    );
  }

  return (
    <AppLink
      target={target}
      to={getRouteArticlesDetails(article.id)}
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
          {types}
          {views}
        </div>
        <Text title={article.title} className={cls.title} size={"s"} />
      </Card>
    </AppLink>
  );
};
