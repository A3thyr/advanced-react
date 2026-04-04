import { lazy, Suspense } from "react";
import { ArticleRatingProps } from "./ArticleRating";
import { Skeleton } from "@/shared/ui";

export const ArticleRatingAsync = lazy(() => import("./ArticleRating"));

export const ArticleRatingLazy = (props: ArticleRatingProps) => {
  return (
    <Suspense fallback={<Skeleton width={"100%"} height={120} />}>
      <ArticleRatingAsync {...props} />
    </Suspense>
  );
};
