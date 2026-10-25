import { FC } from "react";
import { useTranslation } from "react-i18next";

import { ArticleSortSelector } from "@/features/ArticleSortSelector";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";
import { ArticleViewSelector } from "@/features/ArticleViewSelector";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Card, Input } from "@/shared/ui";

import { useArticleFilters } from "../../lib/hooks/useArticleFilters";
import cls from "./ArticlesPageFilters.module.scss";

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = ({
  className,
}) => {
  const {
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    onChangeView,
    order,
    search,
    sort,
    type,
    view,
  } = useArticleFilters();
  const { t } = useTranslation("articles");

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
        <Input
          onChange={onChangeSearch}
          value={search}
          placeholder={t("search")}
        />
      </Card>
      <ArticleTypeTabs value={type} onChangeType={onChangeType} />
    </div>
  );
};
