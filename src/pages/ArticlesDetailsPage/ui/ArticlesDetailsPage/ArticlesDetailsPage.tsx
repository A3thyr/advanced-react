import { ArticleDetails, ArticleList } from "entities/Article";
import { CommentList } from "entities/Comment";
import { AddCommentForm } from "features/addCommentForm";
import { getArticleRecommendationsIsLoading } from "pages/ArticlesDetailsPage/model/selectors/recommendations";
import { fetchArticlesRecommendations } from "pages/ArticlesDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import {
  articleDetailsPageRecommendationsReducer,
  getArticlePageRecommendations,
} from "pages/ArticlesDetailsPage/model/slices/articleDetailsPageRecommendationsSlice";
import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePath } from "shared/config/router/router.config";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Button, Text, ThemeButton } from "shared/ui";
import { TextSize } from "shared/ui/Text/Text";
import { PageLayout } from "widgets";
import { addCommentForArticle } from "../../../ArticlesDetailsPage/model/services/addCommentForArticle/addCommentForArticle";
import { fetchCommentsByArticleId } from "../../../ArticlesDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from "../../model/slices/articleDetailsCommentsSlice";
import cls from "./ArticlesDetailsPage.module.scss";

interface ArticlesDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
  articleRecommendations: articleDetailsPageRecommendationsReducer,
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
  const navigate = useNavigate();

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles_details);
  }, [navigate]);

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
        <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
          {t("back")}
        </Button>
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
