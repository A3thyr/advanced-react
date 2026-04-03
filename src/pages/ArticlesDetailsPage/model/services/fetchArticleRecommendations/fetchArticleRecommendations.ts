import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Article } from "@/entities/Article";

export const fetchArticlesRecommendations = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>("articleDetails/fetchRecommendations", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const res = await extra.api.get<Article[]>(`/articles`, {
      params: {
        _limit: 4,
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
