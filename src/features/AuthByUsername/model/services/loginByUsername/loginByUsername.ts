import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "entities/User";
import i18n from "shared/config/i18n/i18n";

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  { rejectValue: string }
>("login/loginByUsername", async ({ password, username }, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:8000/login", {
      password,
      username,
    });
    if (!res.data) throw new Error();
    return res.data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(i18n.t("Incorrect username or password"));
  }
});
