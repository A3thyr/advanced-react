import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleSortField } from "@/entities/Article";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { SortOrder } from "@/shared/types";
import { SelectOption } from "@/shared/ui";
import { ListBox } from "@/shared/ui/redesigned/Popups";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text/Text";
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
    <div
      className={classNames(cls.ArticleSortSelectorRedesigned, {}, [className])}
    >
      <VStack gap={8}>
        <Text text={t("sort.title")} />
        <ListBox
          value={sort}
          onChange={onChangeSort}
          items={sortFieldOptions}
        />
        <ListBox value={order} onChange={onChangeOrder} items={orderOptions} />
      </VStack>
    </div>
  );
};
