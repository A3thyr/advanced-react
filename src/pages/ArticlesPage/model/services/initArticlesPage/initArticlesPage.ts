import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getArticlePageInited } from "../../selectors/articlePageSelectors";
import { articlePageActions } from "../../slices/articlePageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

export const initArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>("articlesPage/initArticlesPage", async (_, thunkApi) => {
  const { getState, dispatch } = thunkApi;
  const _inited = getArticlePageInited(getState());

  if (!_inited) {
    dispatch(articlePageActions.initState());

    dispatch(
      fetchArticlesList({
        page: 1,
      }),
    );
  }
});
