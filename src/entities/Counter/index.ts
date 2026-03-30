export {
  counterReducer,
  counterSlice,
  counterActions,
} from "./model/slice/counterSlice";

// types
export type { CounterSchema } from "./model/types/counterSchema";

// component
export { Counter } from "./ui/Counter";

// selectors
export { getCounter } from "./model/selectors/getCounter/getCounter";
export { getCounterValue } from "./model/selectors/getCounterValue/getCounterValue";
