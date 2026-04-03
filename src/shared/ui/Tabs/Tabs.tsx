import { memo, ReactNode, useCallback } from "react";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import cls from "./Tabs.module.scss";
import { Card, CardTheme } from "../Card/Card";

export interface TabItem<T extends string = string> {
  value: T;
  content: ReactNode;
}

interface TabsProps<T extends string> {
  className?: string;
  tabs: TabItem<T>[];
  value: T;
  onTabClick: (tab: TabItem<T>) => void;
}

const TabsComponent = <T extends string>({
  className,
  tabs,
  onTabClick,
  value,
}: TabsProps<T>) => {
  const clickHandle = useCallback(
    (tab: TabItem<T>) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          key={tab.value}
          className={cls.tab}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
};

// memo съедает дженерик; двойное приведение сохраняет сигнатуру <T extends string>(props: TabsProps<T>) => …
export const Tabs = memo(TabsComponent) as unknown as typeof TabsComponent;

Object.assign(Tabs, { displayName: "Tabs" });
