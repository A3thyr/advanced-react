import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button } from "shared/ui";
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import { counterActions } from "../model/slice/counterSlice";

interface CounterProps {
  className?: string;
}

export const Counter: FC<CounterProps> = () => {
  const { t } = useTranslation("translation");
  const dispatch = useAppDispatch();
  const counterValue = useSelector(getCounterValue);
  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button onClick={increment} data-testid="increment-btn">
        {t("increment")}
      </Button>
      <Button onClick={decrement} data-testid="decrement-btn">
        {t("decrement")}
      </Button>
    </div>
  );
};
