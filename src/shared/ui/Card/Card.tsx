import { HTMLAttributes, ReactNode } from "react";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import cls from "./Card.module.scss";

export enum CardTheme {
  NORMAL = "normal",
  OUTLINED = "outlined",
}
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  max?: boolean;
}

export const Card = ({
  children,
  className,
  theme = CardTheme.NORMAL,
  max,
  ...otherProps
}: CardProps) => {
  return (
    <div
      className={classNames(cls.Card, { [cls.max]: max }, [
        className,
        cls[theme],
      ])}
      {...otherProps}
    >
      {children}
    </div>
  );
};
