import { useTranslation } from "react-i18next";
import { ArticleList } from "@/entities/Article";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Skeleton, Text as TextDeprecated } from "@/shared/ui";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { TextSize } from "@/shared/ui/deprecated/Text/Text";
import { useArticleRecommendationsList } from "../../api/articleRecommendationsApi";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text/Text";

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = ({
  className,
}: ArticleRecommendationsListProps) => {
  const { t } = useTranslation("article_details");
  const {
    isLoading,
    data: recommendations,
    error,
  } = useArticleRecommendationsList(3);

  if (!recommendations) {
    return <TextDeprecated text={t("no-data")} />;
  }

  if (isLoading || error) {
    return (
      <VStack max gap={8} className={classNames("", {}, [className])}>
        <Skeleton width="60%" height={40} />
        <HStack gap={16} max>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={`skeleton-key${index}`} width="28%" height={330} />
          ))}
        </HStack>
      </VStack>
    );
  }

  return (
    <VStack
      data-testid="ArticleRecommendationsList"
      gap={8}
      className={classNames("", {}, [className])}
    >
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<Text size={"l"} title={t("recommended")} />}
        off={<TextDeprecated size={TextSize.L} title={t("recommended")} />}
      />

      <ArticleList
        articles={recommendations}
        isLoading={isLoading}
        target="_blank"
      />
    </VStack>
  );
};
