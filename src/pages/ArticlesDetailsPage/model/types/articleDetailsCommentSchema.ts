import { EntityState } from "@reduxjs/toolkit";
import { ArticleComment } from "entities/Comment";

export interface ArticleDetailsCommentSchema
  extends EntityState<ArticleComment> {
  isLoading?: boolean;
  error?: string;
}
