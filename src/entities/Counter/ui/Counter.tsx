import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "shared/ui";
import { counterActions } from "../index";

interface CounterProps {
  className?: string;
}

export const Counter: FC<CounterProps> = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const counterValue = useSelector((state: StateSchema) => state.counter.value);
  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div>
      <h1>{counterValue}</h1>
      <Button onClick={increment}>{t("increment")}</Button>
      <Button onClick={decrement}>{t("decrement")}</Button>
    </div>
  );
};
