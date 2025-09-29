import { FC } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Link, LinkProps } from "react-router-dom";
import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = ({
  to,
  children,
  className,
  theme = AppLinkTheme.PRIMARY,
  ...otherProps
}) => (
  <Link
    to={to}
    className={classNames(cls.AppLink, {}, [className, cls[theme]])}
    {...otherProps}
  >
    {children}
  </Link>
);
