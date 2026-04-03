import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Article } from "../../types/article";

export const fetchArticleById = createAsyncThunk<
  Article,
  string | undefined,
  ThunkConfig<string>
>("articleDetails/fetchArticleById", async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    if (!articleId) rejectWithValue("Article ID has not been recieved");

    const res = await extra.api.get<Article>(`/articles/${articleId}`, {
      params: {
        _expand: "user",
      },
    });

    if (!res.data) {
      throw new Error();
    }

    return res.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("error");
  }
});
