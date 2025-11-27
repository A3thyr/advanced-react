import { lazy } from "react";

export const ArticlesDetailsPageLazy = lazy(
  () => import("./ArticlesDetailsPage")
);
