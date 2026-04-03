import { StateSchema } from "@/app/providers/StoreProvider";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { getProfileData } from "./getProfileData";

describe("getProfileData.test", () => {
  test("should return password", () => {
    const data = {
      username: "Unknown",
      age: 19,
      country: Country.Kazakhstan,
      lastname: "Something",
      first: "Someone",
      city: "sddfa",
      currency: Currency.EUR,
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
