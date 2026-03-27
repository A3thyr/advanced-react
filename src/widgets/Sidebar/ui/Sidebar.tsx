import { FC, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Button, ThemeButton } from "shared/ui";
import { ButtonSize } from "shared/ui/Button/Button";
import { VStack } from "shared/ui/Stack";
import { LangSwitcher } from "widgets/LangSwitcher";
import { ThemeSwitcher } from "widgets/theme-switcher";
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
  );
};
