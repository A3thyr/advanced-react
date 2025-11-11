import { FC, lazy } from "react";
import { LoginFormProps } from "./LoginForm";

export const MainPageLazy = lazy<FC<LoginFormProps>>(
  () => import("./LoginForm")
);
