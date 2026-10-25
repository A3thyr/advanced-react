import { FC, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/theme-switcher";
import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Icon } from "@/shared/ui";
import { AppLogo } from "@/shared/ui/redesigned/AppLogo";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { getSideBarItems } from "../model/selectors/getSidebarItems";
import cls from "./Sidebar.module.scss";
import { SidebarItem } from "./SidebarItem/SidebarItem";

interface SidebarProps {
  className?: string;
}

// где то здесь фиксы

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);

  const SidebarItemsList = useSelector(getSideBarItems);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () =>
      SidebarItemsList.map((item) => (
        <SidebarItem key={item.path} item={item} collapsed={collapsed} />
      )),
    [collapsed, SidebarItemsList],
  );

  return (
    <aside
      data-testid="sidebar"
      className={classNames(
        cls.SidebarRedesigned,
        { [cls.collapsedRedesigned]: collapsed },
        [className],
      )}
    >
      <AppLogo size={collapsed ? 30 : 55} className={cls.appLogo} />
      <VStack role="navigation" gap={8} className={cls.items}>
        {itemsList}
      </VStack>
      <Icon
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapsedBtn}
        Svg={ArrowIcon}
        clickable
      />
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </aside>
  );
};
