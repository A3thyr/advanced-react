import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RatingCard } from "@/entities/Rating";
import {
  useGetArticleRating,
  useRateArticle,
} from "../../api/articleRatingApi";
import { getUserAuthData } from "@/entities/User";
import { Skeleton } from "@/shared/ui";

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating: FC<ArticleRatingProps> = ({ className, articleId }) => {
  const { t } = useTranslation("article_details");
  const userData = useSelector(getUserAuthData);
  const { data: ratingsData, isLoading } = useGetArticleRating({
    articleId,
    userId: userData?.id ?? "",
  });

  const [rateArticleMutation] = useRateArticle();

  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          articleId,
          rate: starsCount,
          userId: userData?.id ?? "",
          feedback,
        });
      } catch (error) {
        console.error("handleRateArticle error:", error);
      }
    },
    [rateArticleMutation, articleId, userData?.id],
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle],
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle],
  );

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  const rating = ratingsData?.[0];

  return (
    <RatingCard
      rate={rating?.rate}
      className={className}
      title={t("feedback.title")}
      feedbackTitle={t("feedback.placeholder")}
      onAccept={onAccept}
      onCancel={onCancel}
      hasFeedback
    />
  );
};

export default ArticleRating;
