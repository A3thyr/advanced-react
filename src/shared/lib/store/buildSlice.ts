import {
  bindActionCreators,
  createSlice,
  CreateSliceOptions,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch/useAppDispatch";

/**
 *
 * @todo apparently there's an error with types of actions within useActions hook
 * @returns slice and useActions hook
 */

export function buildSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
  const slice = createSlice(options);

  const useActions = (): typeof slice.actions => {
    const dispatch = useAppDispatch();

    // @ts-expect-error
    return useMemo(
      // @ts-expect-error
      () => bindActionCreators(slice.actions, dispatch),
      [dispatch],
    );
  };

  return {
    ...slice,
    useActions,
  };
}
