import { Profile } from "entities/Profile/model/types/profile";
import { ValidateProfileError } from "../const/const";

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateError?: ValidateProfileError[];
}
