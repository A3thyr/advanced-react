import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "../../types/article";

export const fetchArticleById = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>("articleDetails/fetchArticleById", async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const res = await extra.api.get<Article>(`/articles/${articleId}`);

    if (!res.data) {
      throw new Error();
    }

    return res.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("error");
  }
});
