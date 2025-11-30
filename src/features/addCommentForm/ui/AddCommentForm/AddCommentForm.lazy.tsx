import { lazy } from "react";
import { AddCommentFormProps } from "./AddCommentForm";

export const AddCommentFormLazy = lazy<AddCommentFormProps>(
  () => import("./AddCommentForm")
);
