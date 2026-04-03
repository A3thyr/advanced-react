import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { validateProfileData } from "./validateProfileData";
import { ValidateProfileError } from "../../const/const";

const data = {
  username: "Unknown",
  age: 19,
  country: Country.Kazakhstan,
  lastname: "Something",
  first: "Someone",
  city: "sddfa",
  currency: Currency.EUR,
};

describe("validateProfileData.test", () => {
  test("no errors", async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test("no firstname and lastname", async () => {
    const result = validateProfileData({
      ...data,
      first: "",
      lastname: "",
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
  test("incorrect age", async () => {
    const result = validateProfileData({
      ...data,
      age: 0,
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });
  test("incorrect country", async () => {
    const result = validateProfileData({
      ...data,
      country: undefined,
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
  });
  test("all fields are incorrect", async () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });
});
