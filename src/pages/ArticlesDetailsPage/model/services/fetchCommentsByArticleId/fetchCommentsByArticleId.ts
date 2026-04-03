import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ArticleComment } from "@/entities/Comment";

export const fetchCommentsByArticleId = createAsyncThunk<
  ArticleComment[],
  string | undefined,
  ThunkConfig<string>
>("articleDetails/fetchCommentsByArticleId", async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  if (!articleId) {
    return rejectWithValue("error");
  }

  try {
    const res = await extra.api.get<ArticleComment[]>(`/comments`, {
      params: {
        articleId,
        _expand: "user",
      },
    });

    if (!res.data) {
      throw new Error();
    }

    return res.data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
