import { StateSchema } from "@/app/providers/StoreProvider";

export const getArticleRecommendationsIsLoading = (state: StateSchema) =>
  state.articleDetailsPage?.recommendatations?.isLoading;
export const getArticleRecommendationsError = (state: StateSchema) =>
  state.articleDetailsPage?.comments?.error;
