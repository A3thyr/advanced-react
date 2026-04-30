import { FC, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CalendarIcon from "@/shared/assets/icons/calendar-20-20.svg";
import EyeIcon from "@/shared/assets/icons/eye-20-20.svg";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  Avatar,
  Icon,
  Skeleton,
  Text,
  TextAlign,
  TextTheme,
} from "@/shared/ui";
import { HStack, VStack } from "@/shared/ui/Stack";
import { TextSize } from "@/shared/ui/Text/Text";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import { ArticleBlock } from "../../model/types/article";
import { ArticleBlockType } from "../../model/const/articleConst";
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import cls from "./ArticleDetails.module.scss";

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<ArticleDetailsProps> = ({ className, id }) => {
  const { t } = useTranslation("article_details");
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  // const isLoading = true;
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            block={block}
            key={block.id}
            className={cls.block}
          />
        );
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        );
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            block={block}
            key={block.id}
            className={cls.block}
          />
        );
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    if (__PROJECT__ !== "storybook") dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton
          width={200}
          height={200}
          border="50%"
          className={cls.avatar}
        />
        <Skeleton width="60%" height={32} className={cls.title} />
        <Skeleton width="30%" height={36} className={cls.skeleton} />
        <Skeleton width="100%" height={120} className={cls.skeleton} />
        <Skeleton width="100%" height={120} className={cls.skeleton} />
      </>
    );
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        title={t("error")}
        theme={TextTheme.ERROR}
      />
    );
  } else {
    content = (
      <>
        <HStack justfify="center" max className={cls.avatarWrapper}>
          <Avatar size={200} src={article?.img} className={cls.avatar} />
        </HStack>
        <VStack data-testid="ArticleDetails.Info" gap={8} max>
          <Text
            className={cls.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
          />
          <HStack gap={8} className={cls.articleInfo}>
            <Icon Svg={EyeIcon} />
            <Text text={String(article?.views)} />
          </HStack>
          <HStack gap={8} className={cls.articleInfo}>
            <Icon Svg={CalendarIcon} />
            <Text text={article?.createdAt} />
          </HStack>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack
        gap={16}
        max
        className={classNames(cls.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
};
