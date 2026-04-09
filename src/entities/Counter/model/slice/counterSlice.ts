import { buildSlice } from "@/shared/lib/store";
import { CounterSchema } from "../types/counterSchema";

// export interface CounterState {
//   value: number;
// }

const initialState: CounterSchema = {
  value: 0,
};

export const counterSlice = buildSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const {
  actions: counterActions,
  useActions: useCounterActions,
  reducer: counterReducer,
} = counterSlice;
