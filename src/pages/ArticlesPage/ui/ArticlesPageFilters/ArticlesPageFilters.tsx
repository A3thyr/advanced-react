import {
  ArticleSortField,
  ArticleView,
  ArticleViewSelector,
} from "entities/Article";
import { ArticleSortSelector } from "entities/Article/ui/ArticleSortSelector/ArticleSortSelector";
import {
  getArticlePageOrder,
  getArticlePageSort,
  getArticlePageView,
} from "pages/ArticlesPage/model/selectors/articlePageSelectors";
import { articlePageActions } from "pages/ArticlesPage/model/slices/articlePageSlice";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { SortOrder } from "shared/types";
import { Card, Input } from "shared/ui";
import cls from "./ArticlesPageFilters.module.scss";

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = ({
  className,
}) => {
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlePageView);
  const { t } = useTranslation("articles");
  const sort = useSelector(getArticlePageSort);
  const order = useSelector(getArticlePageOrder);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageActions.setView(view));
    },
    [dispatch],
  );

  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlePageActions.setSort(newSort));
    },
    [dispatch],
  );

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlePageActions.setOrder(newOrder));
    },
    [dispatch],
  );

  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
          order={order}
          sort={sort}
        />
        <ArticleViewSelector view={view} onClickView={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input placeholder={t("search")} />
      </Card>
    </div>
  );
};
