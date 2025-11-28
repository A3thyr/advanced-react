import { ARTICLE_EXAMPLE } from "shared/const/articleExample";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchArticleById } from "./fetchArticleById";

// const data = {
//   username: "Unknown",
//   age: 19,
//   country: Country.Kazakhstan,
//   lastname: "Something",
//   first: "Someone",
//   city: "sddfa",
//   currency: Currency.EUR,
// };

describe("fetchArticleById.test", () => {
  test("should be fulfilled", async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: ARTICLE_EXAMPLE }));

    const result = await thunk.callThunk("1");

    console.log(result);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(ARTICLE_EXAMPLE);
  });

  test("should be rejected", async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);

    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk("1");

    expect(result.meta.requestStatus).toBe("rejected");
  });
});
