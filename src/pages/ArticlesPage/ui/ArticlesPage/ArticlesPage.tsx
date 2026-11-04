import { FC, memo, useCallback } from "react";
import { ArticlePageGreeting } from "@/features/articlePageGreeting";
import { StickyContentLayout } from "@/shared/layouts/StickyContentLayout";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLayout } from "@/widgets";
import { useArticleItemById } from "../../model/selectors/articlePageSelectors";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { articlePageReducer } from "../../model/slices/articlePageSlice";
import { ArticleInfiniteList } from "../ArticleInfiniteList/ArticleInfiniteList";
import { FiltersContainer } from "../FiltersContainer/FiltersContainer";
import { ViewSelectorContainer } from "../ViewSelectorContainer/ViewSelectorContainer";
import cls from "./ArticlesPage.module.scss";

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
    <StickyContentLayout
      left={<ViewSelectorContainer />}
      right={<FiltersContainer />}
      content={
        <PageLayout
          data-testid="ArticlesPage"
          onScrollEnd={onLoadNextPart}
          className={classNames(cls.ArticlesPageRedesigned, {}, [className])}
        >
          {/* <ArticlesPageFilters /> */}
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
