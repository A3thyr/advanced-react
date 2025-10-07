import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation(["main", "about"]);
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links} />
    </div>
  );
};
