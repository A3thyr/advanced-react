import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "entities/Article/model/selectors/articleDetails";
import { fetchArticleById } from "entities/Article/model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice";
import {
  ArticleBlock,
  ArticleBlockType,
} from "entities/Article/model/types/article";
import { FC, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CalendarIcon from "shared/assets/icons/calendar-20-20.svg";
import EyeIcon from "shared/assets/icons/eye-20-20.svg";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Avatar, Icon, Skeleton, Text, TextAlign, TextTheme } from "shared/ui";
import { TextSize } from "shared/ui/Text/Text";
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import cls from "./ArticleDetails.module.scss";

interface ArticleDetailsProps {
  className?: string;
  id: string;
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
        return <ArticleCodeBlockComponent key={block.id} />;
      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent key={block.id} />;
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent key={block.id} />;
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    dispatch(fetchArticleById(id));
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
        <div className={cls.avatarWrapper}>
          <Avatar size={200} src={article?.img} className={cls.avatar} />
        </div>
        <Text
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <div className={cls.articleInfo}>
          <Icon Svg={EyeIcon} />
          <Text text={String(article?.views)} />
        </div>
        <div className={cls.articleInfo}>
          <Icon Svg={CalendarIcon} />
          <Text text={article?.createdAt} />
        </div>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  );
};
