import { lazy } from "react";
import { AddCommentFormProps } from "./AddCommentForm";

export const AddCommentFormLazy = lazy(() => import("./AddCommentForm"));
