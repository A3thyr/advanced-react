import { FC } from "react";
import { LinkProps, NavLink } from "react-router-dom";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import cls from "./AppLink.module.scss";

export type AppLinkVariant = "primary" | "red";

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  activeClassName?: string;
}

export const AppLink: FC<AppLinkProps> = ({
  to,
  children,
  className,
  variant = "primary",
  activeClassName = "",
  ...otherProps
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      classNames(cls.AppLink, { [activeClassName]: isActive }, [
        className,
        cls[variant],
      ])}
    {...otherProps}
  >
    {children}
  </NavLink>
);
