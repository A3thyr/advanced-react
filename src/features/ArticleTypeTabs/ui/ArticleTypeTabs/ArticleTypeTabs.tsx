import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  TabItem as TabItemDeprecated,
  Tabs as TabsDeprecated,
} from "@/shared/ui";
import { ArticleType } from "@/entities/Article";
import { ToggleFeatures } from "@/shared/lib/features";
import { Tabs } from "@/shared/ui/redesigned/Tabs/Tabs";

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
    (tab: TabItemDeprecated<ArticleType>) => {
      onChangeType(tab.value);
    },
    [onChangeType],
  );

  const typeTabs = useMemo<TabItemDeprecated<ArticleType>[]>(
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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Tabs
          className={className}
          direction="column"
          tabs={typeTabs}
          onTabClick={handleTabClick}
          value={value}
        />
      }
      off={
        <TabsDeprecated
          className={className}
          tabs={typeTabs}
          onTabClick={handleTabClick}
          value={value}
        />
      }
    />
  );
};
