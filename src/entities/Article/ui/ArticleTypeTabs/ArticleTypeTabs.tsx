import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TabItem, Tabs } from "shared/ui";
import { ArticleType } from "../../model/types/article";

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs: FC<ArticleTypeTabsProps> = ({
  className,
  value,
  onChangeType,
}) => {
  const { t } = useTranslation("articles");

  const handleTabClick = useCallback(
    (tab: TabItem<ArticleType>) => {
      onChangeType(tab.value);
    },
    [onChangeType],
  );

  const typeTabs = useMemo<TabItem<ArticleType>[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t("article-type.all"),
      },
      {
        value: ArticleType.IT,
        content: t("article-type.IT"),
      },

      {
        value: ArticleType.ECONOMICS,
        content: t("article-type.economics"),
      },
      {
        value: ArticleType.SCIENCE,
        content: t("article-type.science"),
      },
    ],
    [t],
  );

  return (
    <Tabs
      className={className}
      tabs={typeTabs}
      onTabClick={handleTabClick}
      value={value}
    />
  );
};
