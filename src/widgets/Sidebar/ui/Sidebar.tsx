import { FC, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/theme-switcher";
import { ToggleFeatures } from "@/shared/lib/features";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Button, Icon, ThemeButton } from "@/shared/ui";
import {
  Button as ButtonDeprecated,
  ButtonSize,
} from "@/shared/ui/deprecated/Button/Button";
import { AppLogo } from "@/shared/ui/redesigned/AppLogo";
import { VStack } from "@/shared/ui/deprecated/Stack";
import { getSideBarItems } from "../model/selectors/getSidebarItems";
import cls from "./Sidebar.module.scss";
import { SidebarItem } from "./SidebarItem/SidebarItem";
import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg";

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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
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
      }
      off={
        <aside
          data-testid="sidebar"
          className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
            className,
          ])}
        >
          <ButtonDeprecated
            data-testid="sidebar-toggle"
            theme={ThemeButton.BACKGROUND_INVERTED}
            onClick={onToggle}
            square
            size={ButtonSize.L}
            className={cls.collapsedBtn}
          >
            {collapsed ? ">" : "<"}
          </ButtonDeprecated>

          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={cls.lang} />
          </div>
        </aside>
      }
    />
  );
};
