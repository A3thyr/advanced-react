import {
  AnyAction,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { ArticleDetailsSchema } from "entities/Article";
import { CounterSchema } from "entities/Counter";
import { ProfileSchema } from "entities/Profile";
import { UserSchema } from "entities/User";
import { AddCommentFormSchema } from "features/addCommentForm";
import { LoginSchema } from "features/AuthByUsername";
import {
  ArticleDetailsCommentSchema,
  ArticleDetailsPageRecommendationsSchema,
} from "pages/ArticlesDetailsPage";
import { ArticlePageSchema } from "pages/ArticlesPage";
import { CombinedState } from "redux";
import { ScrollSaveSchema } from "widgets/PageLayout/ScrollSave";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  scrollSave: ScrollSaveSchema;
  // Асинхронные редюсеры
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: ArticleDetailsCommentSchema;
  articleRecommendations?: ArticleDetailsPageRecommendationsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlePage?: ArticlePageSchema;
}

export type StateSchemaKey = keyof StateSchema;
// export type MountedReducers = Partial<Record<StateSchemaKey, boolean>>;
export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  // true - вмонтирован, false - демонтирован
  // getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  // navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
