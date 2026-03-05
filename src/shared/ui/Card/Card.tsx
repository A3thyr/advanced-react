import { HTMLAttributes, ReactNode } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./Card.module.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Card = ({ children, className, ...otherProps }: CardProps) => {
  return (
    <div className={classNames(cls.Card, {}, [className])} {...otherProps}>
      {children}
    </div>
  );
};
