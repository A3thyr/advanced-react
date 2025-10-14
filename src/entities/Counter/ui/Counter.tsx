import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "shared/ui";
import { counterActions, getCounterValue } from "../index";

interface CounterProps {
  className?: string;
}

export const Counter: FC<CounterProps> = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch();
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
