import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { profileActions, profileReducer } from "./profileSlice";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import {
  ProfileSchema,
  ValidateProfileError,
} from "../types/editableProfileCardSchema";

const data = {
  username: "Unknown",
  age: 19,
  country: Country.Kazakhstan,
  lastname: "Something",
  first: "Someone",
  city: "sddfa",
  currency: Currency.EUR,
};

describe("profileSlice.test", () => {
  test("test set readonly", () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false,
    };
    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(true)),
    ).toEqual({ readonly: true });
  });
  test("test cancel edit", () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { first: "" } };
    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
    ).toEqual({ readonly: true, validateError: undefined, data, form: data });
  });
  test("test update profile", () => {
    const state: DeepPartial<ProfileSchema> = {
      form: { first: "someone" },
    };
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({ first: "something" }),
      ),
    ).toEqual({ form: { first: "something" } });
  });

  test("test update profile service pending", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateError: [ValidateProfileError.SERVER_ERROR],
    };
    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending),
    ).toEqual({
      isLoading: true,
      validateErrors: undefined,
    });
  });

  test("test update profile service fullfiled", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };
    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, ""),
      ),
    ).toEqual({
      isLoading: false,
      validateError: undefined,
      readonly: true,
      form: data,
      data,
    });
  });
});
