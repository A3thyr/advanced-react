import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "shared/ui";
import { counterActions } from "../model/slice/counterSlice";

interface CounterProps {
  className?: string;
}

export const Counter: FC<CounterProps> = ({ className }) => {
  const dispatch = useDispatch();
  const counterValue = useSelector((state: StateSchema) => state);
  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div>
      <h1>value</h1>
      <Button onClick={increment}>increment</Button>
      <Button onClick={decrement}>decrement</Button>
    </div>
  );
};
