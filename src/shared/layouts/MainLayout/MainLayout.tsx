import { FC } from "react";
import { useTranslation } from "react-i18next";
import cls from "./MainLayout.module.scss";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";

interface MainLayoutProps {
  className?: string;
}

export const MainLayout: FC<MainLayoutProps> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.MainLayout, {}, [className])}>
      {t("TODO")}
    </div>
  );
};
