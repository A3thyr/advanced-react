import { FC } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { VStack } from "@/shared/ui/redesigned/Stack";

import cls from "./ArticlesFilters.module.scss";
import { ArticleSortField, ArticleType } from "@/entities/Article";
import { SortOrder } from "@/shared/types";
import { ArticleSortSelector } from "@/features/ArticleSortSelector";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import SearchIcon from "@/shared/assets/icons/search.svg";
import { Icon } from "@/shared/ui";

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
          addonLeft={<Icon Svg={SearchIcon} />}
        />
        <ArticleTypeTabs value={type} onChangeType={onChangeType} />
        <ArticleSortSelector
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
          order={order}
          sort={sort}
        />
      </VStack>
    </Card>
  );
};
