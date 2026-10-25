import { memo, ReactNode, useCallback } from "react";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import cls from "./Tabs.module.scss";
import { Card } from "../Card/Card";
import { Flex, FlexDirection } from "../Stack/Flex/Flex";

export interface TabItem<T extends string = string> {
  value: T;
  content: ReactNode;
}

interface TabsProps<T extends string> {
  className?: string;
  tabs: TabItem<T>[];
  value: T;
  onTabClick: (tab: TabItem<T>) => void;
  direction?: FlexDirection;
}

const TabsComponent = <T extends string>({
  className,
  tabs,
  onTabClick,
  value,
  direction = "row",
}: TabsProps<T>) => {
  const clickHandle = useCallback(
    (tab: TabItem<T>) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <Flex
      direction={direction}
      gap={8}
      className={classNames(cls.Tabs, {}, [className])}
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;
        return (
          <Card
            variant={isSelected ? "light" : "primary"}
            key={tab.value}
            className={classNames(cls.tab, { [cls.selected]: isSelected })}
            onClick={clickHandle(tab)}
            border="round"
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
};

// memo съедает дженерик; двойное приведение сохраняет сигнатуру <T extends string>(props: TabsProps<T>) => …
export const Tabs = memo(TabsComponent) as unknown as typeof TabsComponent;

Object.assign(Tabs, { displayName: "Tabs" });
