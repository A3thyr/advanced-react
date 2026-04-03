import { StateSchema } from "@/app/providers/StoreProvider";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { fetchNextArticlesPage } from "./fetchNextArticlesPage";

jest.mock("../fetchArticlesList/fetchArticlesList");

const mockedFetchArticlesList = jest.mocked(fetchArticlesList);

describe("fetchNextArticlesPage.test", () => {
  test("should fetch next page when hasMore and not loading", async () => {
    const state: DeepPartial<StateSchema> = {
      articlePage: {
        page: 1,
        isLoading: false,
        hasMore: true,
      },
    };

    const thunk = new TestAsyncThunk(fetchNextArticlesPage, state);

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(mockedFetchArticlesList).toHaveBeenCalledWith({});
  });

  test("should not fetch next page when no more items", async () => {
    const state: DeepPartial<StateSchema> = {
      articlePage: {
        page: 1,
        isLoading: false,
        hasMore: false,
      },
    };

    const thunk = new TestAsyncThunk(fetchNextArticlesPage, state);

    await thunk.callThunk();

    expect(mockedFetchArticlesList).not.toHaveBeenCalled();
  });

  test("should not fetch next page when already loading", async () => {
    const state: DeepPartial<StateSchema> = {
      articlePage: {
        page: 1,
        isLoading: true,
        hasMore: true,
      },
    };

    const thunk = new TestAsyncThunk(fetchNextArticlesPage, state);

    await thunk.callThunk();

    expect(mockedFetchArticlesList).not.toHaveBeenCalled();
  });
});
