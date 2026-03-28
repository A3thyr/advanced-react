import { ArticleList } from "entities/Article";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Text } from "shared/ui";
import {
  getArticlePageError,
  getArticlePageIsLoading,
  getArticlePageView,
} from "../../model/selectors/articlePageSelectors";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import { getArticles } from "../../model/slices/articlePageSlice";

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList: FC<ArticleInfiniteListProps> = ({
  className,
}) => {
  const { t } = useTranslation("articles");
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlePageIsLoading);
  const view = useSelector(getArticlePageView);
  const error = useSelector(getArticlePageError);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  if (error) {
    return <Text text={t("not-found")} />;
  }

  return (
    <ArticleList
      isLoading={isLoading}
      view={view}
      articles={articles}
      className={className}
    />
  );
};
