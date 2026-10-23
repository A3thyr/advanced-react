import { FC, ReactElement } from "react";

import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import cls from "./MainLayout.module.scss";

interface MainLayoutProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  sidebar: ReactElement;
  toolbar?: ReactElement;
}

export const MainLayout: FC<MainLayoutProps> = ({
  className,
  content,
  header,
  sidebar,
  toolbar,
}) => {
  return (
    <div className={classNames(cls.MainLayout, {}, [className])}>
      <div className={cls.sidebar}>{sidebar}</div>
      <div className={cls.content}>{content}</div>
      <div className={cls.rightbar}>
        <div className={cls.header}>{header}</div>
        <div className={cls.toolbar}>{toolbar}</div>
      </div>
    </div>
  );
};
