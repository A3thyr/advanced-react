import { ArticleSortField } from "entities/Article/model/types/article";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { SortOrder } from "shared/types";
import { Select, SelectOption } from "shared/ui";
import cls from "./ArticleSortSelector.module.scss";

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = ({
  className,
  onChangeOrder,
  onChangeSort,
  order,
  sort,
}) => {
  const { t } = useTranslation("articles");

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: "asc",
        content: t("asc"),
      },
      {
        value: "desc",
        content: t("desc"),
      },
    ],
    [t],
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t("sort-field.createdAt"),
      },
      {
        value: ArticleSortField.TITLE,
        content: t("sort-field.title"),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t("sort-field.views"),
      },
    ],
    [t],
  );

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select
        value={sort}
        onChange={onChangeSort}
        options={sortFieldOptions}
        label={t("dropdown-title")}
      />
      <Select
        value={order}
        onChange={onChangeOrder}
        options={orderOptions}
        label={t("by")}
      />
    </div>
  );
};
