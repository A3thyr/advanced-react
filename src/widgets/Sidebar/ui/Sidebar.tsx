import { FC, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Button, ThemeButton } from "@/shared/ui";
import { ButtonSize } from "@/shared/ui/Button/Button";
import { VStack } from "@/shared/ui/Stack";
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/theme-switcher";
import { getSideBarItems } from "../model/selectors/getSidebarItems";
import cls from "./Sidebar.module.scss";
import { SidebarItem } from "./SidebarItem/SidebarItem";
import { ToggleFeatures } from "@/shared/lib/features";

interface SidebarProps {
  className?: string;
}

// где то здесь фиксы

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

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
            { [cls.collapsed]: collapsed },
            [className],
          )}
        >
          {t("redesign is in process")}
          {/* <Button
            data-testid="sidebar-toggle"
            theme={ThemeButton.BACKGROUND_INVERTED}
            onClick={onToggle}
            square
            size={ButtonSize.L}
            className={cls.collapsedBtn}
          >
            {collapsed ? ">" : "<"}
          </Button>
          <VStack role="navigation" gap={8} className={cls.items}>
            {itemsList}
          </VStack>
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={cls.lang} />
          </div> */}
        </aside>
      }
      off={
        <aside
          data-testid="sidebar"
          className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
            className,
          ])}
        >
          <Button
            data-testid="sidebar-toggle"
            theme={ThemeButton.BACKGROUND_INVERTED}
            onClick={onToggle}
            square
            size={ButtonSize.L}
            className={cls.collapsedBtn}
          >
            {collapsed ? ">" : "<"}
          </Button>
          <VStack role="navigation" gap={8} className={cls.items}>
            {itemsList}
          </VStack>
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={cls.lang} />
          </div>
        </aside>
      }
    />
  );
};
