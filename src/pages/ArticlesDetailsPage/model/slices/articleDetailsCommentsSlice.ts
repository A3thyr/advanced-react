import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { ArticleComment } from "entities/Comment";
import { ArticleDetailsCommentSchema } from "../types/articleDetailsCommentSchema";
import { fetchCommentsByArticleId } from "../services/fetchCommentsByArticleId/fetchCommentsByArticleId";

const commentsAdapter = createEntityAdapter<ArticleComment>({
  selectId: (comment: ArticleComment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState()
);

const articleDetailsCommentsSlice = createSlice({
  name: "articleDetailsComments",
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
    isLoading: false,
    ids: [],
    entities: {},
    error: undefined,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchCommentsByArticleId.fulfilled,
        (state, action: PayloadAction<ArticleComment[]>) => {
          state.isLoading = false;
          commentsAdapter.setAll(state, action.payload);
        }
      )
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleDetailsCommentsActions } =
  articleDetailsCommentsSlice;
export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice;
