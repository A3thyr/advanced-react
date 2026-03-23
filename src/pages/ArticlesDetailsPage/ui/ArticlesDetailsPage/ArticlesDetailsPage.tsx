import { ArticleDetails, ArticleList } from "entities/Article";
import { CommentList } from "entities/Comment";
import { AddCommentForm } from "features/addCommentForm";
import { getArticleRecommendationsIsLoading } from "pages/ArticlesDetailsPage/model/selectors/recommendations";
import { fetchArticlesRecommendations } from "pages/ArticlesDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import { articleDetailsPageReducer } from "pages/ArticlesDetailsPage/model/slices";
import { getArticlePageRecommendations } from "pages/ArticlesDetailsPage/model/slices/articleDetailsPageRecommendationsSlice";
import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Text } from "shared/ui";
import { TextSize } from "shared/ui/Text/Text";
import { PageLayout } from "widgets";
import { addCommentForArticle } from "../../../ArticlesDetailsPage/model/services/addCommentForArticle/addCommentForArticle";
import { fetchCommentsByArticleId } from "../../../ArticlesDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import cls from "./ArticlesDetailsPage.module.scss";
import { ArticlesDetailsPageHeader } from "../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader";

interface ArticlesDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticlesDetailsPage: FC<ArticlesDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation("article_details");
  const { id } = useParams<{ id: string }>();
  const recommendations = useSelector(getArticlePageRecommendations.selectAll);
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const recommendationsIsLoading = useSelector(
    getArticleRecommendationsIsLoading,
  );
  const dispatch = useAppDispatch();

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticlesRecommendations());
  });

  if (!id) {
    return (
      <PageLayout
        className={classNames(cls.ArticlesDetailsPage, {}, [className])}
      >
        {t("not-found")}
      </PageLayout>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <PageLayout
        className={classNames(cls.ArticlesDetailsPage, {}, [className])}
      >
        <ArticlesDetailsPageHeader />
        <ArticleDetails id={id} />
        <Text
          size={TextSize.L}
          className={cls.commentTitle}
          title={t("recommended")}
        />
        <ArticleList
          articles={recommendations}
          isLoading={recommendationsIsLoading}
          className={cls.recommended}
          target="_blank"
        />

        <Text
          size={TextSize.L}
          className={cls.commentTitle}
          title={t("comment-title")}
        />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </PageLayout>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesDetailsPage);
