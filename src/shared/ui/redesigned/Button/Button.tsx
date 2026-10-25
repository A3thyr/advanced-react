import { ButtonHTMLAttributes, FC } from "react";
import {
  classNames,
  Mods,
} from "@/shared/lib/helpers/classNames/classNames.helper";
import cls from "./Button.module.scss";

export type ButtonVariant = "clear" | "outline" | "filled";

export type ButtonSize = "m" | "l" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  variant = "outline",
  square,
  disabled,
  fullWidth,
  size = "m",
  ...otherProps
}) => {
  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
  };
  return (
    <button
      className={classNames(cls.Button, mods, [
        className,
        cls[variant],
        cls[size],
      ])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
