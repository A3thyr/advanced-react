import { ButtonHTMLAttributes, FC, ReactNode } from "react";
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
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  variant = "outline",
  square,
  disabled,
  fullWidth,
  size = "m",
  addonLeft,
  addonRight,
  ...otherProps
}) => {
  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
    [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
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
      <div className={cls.addonLeft}>{addonLeft}</div>

      {children}
      <div className={cls.addonRight}>{addonRight}</div>
    </button>
  );
};
