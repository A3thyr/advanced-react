import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { fetchArticlesRecommendations } from "../services/fetchArticleRecommendations/fetchArticleRecommendations";
import { ArticleDetailsPageRecommendationsSchema } from "../types/articleDetailsPageRecommendationsSchema";

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article: Article) => article.id,
});

export const getArticlePageRecommendations =
  recommendationsAdapter.getSelectors<StateSchema>(
    (state) =>
      state.articleRecommendations || recommendationsAdapter.getInitialState(),
  );

const articleDetailsPageRecommendationsSlice = createSlice({
  name: "articleDetailsPageRecommendations",
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsPageRecommendationsSchema>(
      {
        isLoading: false,
        ids: [],
        entities: {},
        error: undefined,
      },
    ),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesRecommendations.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticlesRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticlesRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleDetailsPageRecommendationsActions } =
  articleDetailsPageRecommendationsSlice;
export const { reducer: articleDetailsPageRecommendationsReducer } =
  articleDetailsPageRecommendationsSlice;
