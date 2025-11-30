import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getArticleDetailsData } from "entities/Article";
import { ArticleComment } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import { fetchCommentsByArticleId } from "../fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<
  ArticleComment,
  string,
  ThunkConfig<string>
>("articleDetails/addCommentForArticle", async (text, thunkApi) => {
  const { extra, rejectWithValue, getState, dispatch } = thunkApi;

  const userData = getUserAuthData(getState());
  const article = getArticleDetailsData(getState());

  if (!userData || !text || !article) return rejectWithValue("no data");

  try {
    const res = await extra.api.post<ArticleComment>("/comments", {
      articleId: article.id,
      userId: userData.id,
      text,
    });
    if (!res.data) throw new Error();

    dispatch(fetchCommentsByArticleId(article.id));

    return res.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("error");
  }
});
