import { DeepPartial } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";

export const StoreDecorator =
  (initialState: DeepPartial<StateSchema>) => (story: () => Story) => {
    return <StoreProvider initialState={initialState}>{story()}</StoreProvider>;
  };
