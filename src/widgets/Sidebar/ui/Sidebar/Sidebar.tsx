import { FC, useState } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./Sidebar.module.scss";
import { ThemeSwitcher } from "widgets/theme-switcher";

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <button onClick={onToggle}>toggle</button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        {/** тогглер языка */}
      </div>
    </div>
  );
};
