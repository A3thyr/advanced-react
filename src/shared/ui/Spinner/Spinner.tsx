import { FC } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./Spinner.module.scss";

interface SpinnerProps {
  className?: string;
}

export const Spinner: FC<SpinnerProps> = ({ className }) => {
  return <span className={classNames(cls.loader, {}, [className])} />;
};
