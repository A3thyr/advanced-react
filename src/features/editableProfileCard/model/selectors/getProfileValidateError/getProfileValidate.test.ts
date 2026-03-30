import { StateSchema } from "app/providers/StoreProvider";
import { getProfileValidateError } from "./getProfileValidateError";
import { ValidateProfileError } from "../../const/const";

describe("getProfileValidateError.test", () => {
  test("should return password", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateError: [
          ValidateProfileError.NO_DATA,
          ValidateProfileError.SERVER_ERROR,
        ],
      },
    };
    expect(getProfileValidateError(state as StateSchema)).toEqual([
      ValidateProfileError.NO_DATA,
      ValidateProfileError.SERVER_ERROR,
    ]);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateError(state as StateSchema)).toEqual(undefined);
  });
});
