import { classNames } from "./classNames.helper";

describe("classNames", () => {
  test("with only first param", () => {
    expect(classNames("someClass")).toBe("someClass");
  });

  test("with mods", () => {
    const expected = "someClass addClass1 addClass2 hovered scrollable";
    expect(
      classNames("someClass", { hovered: true, scrollable: true }, [
        "addClass1",
        "addClass2",
      ])
    ).toBe(expected);
  });

  test("with mods false", () => {
    const expected = "someClass addClass1 addClass2 hovered";
    expect(
      classNames("someClass", { hovered: true, scrollable: false }, [
        "addClass1",
        "addClass2",
      ])
    ).toBe(expected);
  });

  test("with mods undefined", () => {
    const expected = "someClass addClass1 addClass2 hovered";
    expect(
      classNames("someClass", { hovered: true, scrollable: undefined }, [
        "addClass1",
        "addClass2",
      ])
    ).toBe(expected);
  });

  test("with additional class", () => {
    const expected = "someClass addClass1 addClass2";
    expect(classNames("someClass", {}, ["addClass1", "addClass2"])).toBe(
      expected
    );
  });
});
