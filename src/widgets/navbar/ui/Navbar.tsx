import { FC } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import cls from "./Navbar.module.scss";
import { ThemeSwitcher } from "widgets/theme-switcher";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <ThemeSwitcher />
      <div className={cls.links}>
        <AppLink to={`/`} theme={AppLinkTheme.PRIMARY} className={cls.mainLink}>
          Main Page
        </AppLink>
        <AppLink
          to={`/about`}
          theme={AppLinkTheme.SECONDARY}
          className={cls.aboutLink}
        >
          About Page
        </AppLink>
      </div>
    </div>
  );
};
