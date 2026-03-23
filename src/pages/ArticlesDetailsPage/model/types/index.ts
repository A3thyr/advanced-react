import { ArticleDetailsCommentSchema } from "./articleDetailsCommentSchema";
import { ArticleDetailsPageRecommendationsSchema } from "./articleDetailsPageRecommendationsSchema";

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentSchema;
  recommendatations: ArticleDetailsPageRecommendationsSchema;
}
