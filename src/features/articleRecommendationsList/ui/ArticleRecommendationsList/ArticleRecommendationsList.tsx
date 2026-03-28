import { ArticleList } from "entities/Article";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Skeleton, Text } from "shared/ui";
import { HStack, VStack } from "shared/ui/Stack";
import { TextSize } from "shared/ui/Text/Text";
import { useArticleRecommendationsList } from "../../api/articleRecommendationsApi";

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
    <VStack gap={8} className={classNames("", {}, [className])}>
      <Text size={TextSize.L} title={t("recommended")} />
      <ArticleList
        articles={recommendations}
        isLoading={isLoading}
        target="_blank"
      />
    </VStack>
  );
};
