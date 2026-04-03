import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { Profile } from "@/entities/Profile";
import { $api } from "@/shared/api/api";
import {
  componentRender,
  componentRenderOptions,
} from "@/shared/lib/tests/componentRender/componentRender";
import { profileReducer } from "../../model/slice/profileSlice";
import { EditableProfileCard } from "./EditableProfileCard";

const profile: Profile = {
  id: "1",
  first: "admin",
  lastname: "admin",
  age: 54,
  currency: Currency.EUR,
  country: Country.Kazakhstan,
  city: "Moscow",
  username: "admin2134",
};

const options: componentRenderOptions = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: {
        id: "1",
        username: "admin",
      },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe("EditableProfileCard", () => {
  test("should toggle the edit mode within the EditableProfileCard", async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditBtn"),
    );
    expect(
      screen.getByTestId("EditableProfileCardHeader.CancelBtn"),
    ).toBeInTheDocument();
  });
  test("should revert the changes from the form input values on cancel button click", async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditBtn"),
    );

    // cleared initial values
    await userEvent.clear(screen.getByTestId("ProfileCard.first"));
    await userEvent.clear(screen.getByTestId("ProfileCard.lastname"));

    // typed the new ones
    await userEvent.type(screen.getByTestId("ProfileCard.first"), "user");
    await userEvent.type(screen.getByTestId("ProfileCard.lastname"), "user");

    // check if the value was typed
    expect(screen.getByTestId("ProfileCard.first")).toHaveValue("user");
    expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("user");

    // click on the cancel btn to revert the inputs
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.CancelBtn"),
    );

    // check the inputs, which should have their initial values
    expect(screen.getByTestId("ProfileCard.first")).toHaveValue("admin");
    expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("admin");
  });
  test("should trigger the validation error message", async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditBtn"),
    );

    await userEvent.clear(screen.getByTestId("ProfileCard.first"));

    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.SaveBtn"),
    );

    expect(
      screen.getByTestId("EditableProfileCard.Error.Paragraph"),
    ).toBeInTheDocument();
  });

  test("should send the PUT request if the input data is correct", async () => {
    const mockPutReq = jest.spyOn($api, "put");
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditBtn"),
    );

    await userEvent.type(screen.getByTestId("ProfileCard.first"), "user");

    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.SaveBtn"),
    );

    expect(mockPutReq).toHaveBeenCalled();
  });
});
