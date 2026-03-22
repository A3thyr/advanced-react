import { getQueryParams } from "./addQueryParams";

describe("shared/lib/url/addQueryParams", () => {
  test("test with one param", () => {
    const params = getQueryParams({
      test: "value",
    });
    expect(params).toBe("?test=value");
  });

  test("test with multiple params", () => {
    const params = getQueryParams({
      test: "value",
      second: "2",
    });
    expect(params).toBe("?test=value&second=2");
  });

  test("test when param is undefined", () => {
    const params = getQueryParams({
      test: "value",
      second: undefined,
    });
    expect(params).toBe("?test=value");
  });

  test("removes param from URL when value is empty string", () => {
    const spy = jest
      .spyOn(window.location, "search", "get")
      .mockReturnValue("?search=old");

    try {
      const params = getQueryParams({ search: "" });

      expect(params).not.toContain("search=");
      expect(params).toBe("?");
    } finally {
      spy.mockRestore();
    }
  });
});
