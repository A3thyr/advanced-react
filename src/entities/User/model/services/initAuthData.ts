import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types/user";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import {
  LOCAL_STORAGE_LAST_DESIGN_KEY,
  USER_LOCALSTORAGE_KEY,
} from "@/shared/const/localStorage";
import { getUserDataByIdQuery } from "../../api/userApi";

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  "user/initAuthData",
  async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (!userId) return rejectWithValue("");

    try {
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      if (!response.jsonSettings) {
        return rejectWithValue("");
      }

      localStorage.setItem(
        LOCAL_STORAGE_LAST_DESIGN_KEY,
        response.features?.isAppRedesigned ? "new" : "old",
      );

      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue("");
    }
  },
);
