import { FC, memo, useCallback } from "react";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLayout } from "@/widgets";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { articlePageReducer } from "../../model/slices/articlePageSlice";
import { ArticleInfiniteList } from "../ArticleInfiniteList/ArticleInfiniteList";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";
import cls from "./ArticlesPage.module.scss";
import { useArticleItemById } from "../../model/selectors/articlePageSelectors";
import { ArticlePageGreeting } from "@/features/articlePageGreeting";
import { ToggleFeatures } from "@/shared/lib/features";
import { StickyContentLayout } from "@/shared/layouts/StickyContentLayout";
import { ViewSelectorContainer } from "../ViewSelectorContainer/ViewSelectorContainer";
import { FiltersContainer } from "../FiltersContainer/FiltersContainer";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlePage: articlePageReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const articleItem = useArticleItemById("2");

  console.log(articleItem);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <StickyContentLayout
          left={<ViewSelectorContainer />}
          right={<FiltersContainer />}
          content={
            <PageLayout
              data-testid="ArticlesPage"
              onScrollEnd={onLoadNextPart}
              className={classNames(cls.ArticlesPageRedesigned, {}, [
                className,
              ])}
            >
              {/* <ArticlesPageFilters /> */}
              <ArticleInfiniteList className={cls.list} />
              <ArticlePageGreeting />
            </PageLayout>
          }
        />
      }
      off={
        <PageLayout
          data-testid="ArticlesPage"
          onScrollEnd={onLoadNextPart}
          className={classNames(cls.ArticlesPage, {}, [className])}
        >
          <ArticlesPageFilters />
          <ArticleInfiniteList className={cls.list} />
          <ArticlePageGreeting />
        </PageLayout>
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
