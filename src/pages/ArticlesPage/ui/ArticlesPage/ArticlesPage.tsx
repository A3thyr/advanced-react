import {
  ArticleList,
  ArticleView,
  ArticleViewSelector,
} from "entities/Article";
import {
  // getArticlePageError,
  getArticlePageIsLoading,
  getArticlePageView,
} from "pages/ArticlesPage/model/selectors/articlePageSelectors";
import { fetchArticlesList } from "pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";
import { fetchNextArticlesPage } from "pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import {
  articlePageActions,
  articlePageReducer,
  getArticles,
} from "pages/ArticlesPage/model/slices/articlePageSlice";
import { FC, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { PageLayout } from "shared/ui";
import cls from "./ArticlesPage.module.scss";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlePage: articlePageReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlePageIsLoading);
  // const error = useSelector(getArticlePageError);
  const view = useSelector(getArticlePageView);
  // const page = useSelector(getArticlePageNum);
  // const hasMore = useSelector(getArticlePageHasMore);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageActions.setView(view));
    },
    [dispatch],
  );

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(articlePageActions.initState());

    dispatch(
      fetchArticlesList({
        page: 1,
      }),
    );
  });

  return (
    <DynamicModuleLoader reducers={reducers}>
      <PageLayout
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticleViewSelector view={view} onClickView={onChangeView} />
        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </PageLayout>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
