import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getArticleDetailsData } from "entities/Article";
import { ArticleComment } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import { getAddCommentFormText } from "../../selectors/addCommentFormSelectors.ts/addCommentFormSelectors";
import { addCommentFormActions } from "../../slice/addCommentFormSlice";

export const sendComment = createAsyncThunk<
  ArticleComment,
  void,
  ThunkConfig<string>
>("addCommentForm/SendComment", async (authData, thunkApi) => {
  const { extra, rejectWithValue, getState, dispatch } = thunkApi;

  const userData = getUserAuthData(getState());
  const text = getAddCommentFormText(getState());
  const article = getArticleDetailsData(getState());

  if (!userData || !text || !article) return rejectWithValue("no data");

  try {
    const res = await extra.api.post<ArticleComment>("/comments", {
      articleId: article.id,
      userId: userData.id,
      text,
    });
    if (!res.data) throw new Error();

    return res.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("error");
  } finally {
    dispatch(addCommentFormActions.setText(""));
  }
});
