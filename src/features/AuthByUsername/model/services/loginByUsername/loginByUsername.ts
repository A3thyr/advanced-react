import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { User, userActions } from "entities/User";
import { AppRoutes } from "shared/config/router/router.config";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localStorage";

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>("login/loginByUsername", async ({ password, username }, thunkApi) => {
  const { dispatch, extra, rejectWithValue } = thunkApi;

  try {
    const res = await extra.api.post("/login", {
      password,
      username,
    });
    if (!res.data) throw new Error();

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(res.data));
    dispatch(userActions.setAuthData(res.data));
    extra.navigate?.(AppRoutes.ABOUT);
    return res.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("error");
  }
});
