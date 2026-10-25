import { FC } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { VStack } from "@/shared/ui/redesigned/Stack";

import cls from "./ArticlesFilters.module.scss";
import { ArticleSortField, ArticleType } from "@/entities/Article";
import { SortOrder } from "@/shared/types";
import { Input } from "@/shared/ui";
import { ArticleSortSelector } from "@/features/ArticleSortSelector";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  type: ArticleType;
  order: SortOrder;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters: FC<ArticlesFiltersProps> = ({
  className,
  onChangeOrder,
  onChangeSearch,
  onChangeSort,
  onChangeType,
  order,
  search,
  sort,
  type,
}) => {
  const { t } = useTranslation("articles");

  return (
    <Card
      className={classNames(cls.ArticlesFilters, {}, [className])}
      padding={24}
    >
      <VStack gap={32}>
        <Input
          onChange={onChangeSearch}
          value={search}
          placeholder={t("search")}
        />
        <ArticleSortSelector
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
          order={order}
          sort={sort}
        />

        <ArticleTypeTabs value={type} onChangeType={onChangeType} />
      </VStack>
    </Card>
  );
};
