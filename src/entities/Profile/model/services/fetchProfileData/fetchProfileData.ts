import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "../../types/profile";

export const fetchProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>("profile/fetchProfileData", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const res = await extra.api.get<Profile>("/profile");

    if (!res.data) {
      throw new Error();
    }

    return res.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("error");
  }
});
