import { Menu } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { DropdownDirection } from "shared/types/ui";
import cls from "./Dropdown.module.scss";
import { AppLink } from "../AppLink/AppLink";
import { HStack } from "../Stack";

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  "bottom left": cls.menuBottomLeft,
  "bottom right": cls.menuBottomRight,
  "top left": cls.menuTopLeft,
  "top right": cls.menuTopRight,
};

export const Dropdown = ({
  className,
  items,
  trigger,
  direction = "bottom right",
}: DropdownProps) => {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap={4} align="center" className={cls.dropdownStack}>
      <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
        <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
        <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
          {items.map((item) => {
            const content = ({ active }: { active: boolean }) => (
              <button
                type="button"
                onClick={item.onClick}
                disabled={item.disabled}
                className={classNames(cls.item, { [cls.active]: active })}
              >
                {item.content}
              </button>
            );

            if (item.href) {
              return (
                <Menu.Item
                  key={item.href}
                  as={AppLink}
                  to={item.href}
                  disabled={item.disabled}
                >
                  {content}
                </Menu.Item>
              );
            }

            return (
              <Menu.Item key={item.href} as={Fragment} disabled={item.disabled}>
                {content}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Menu>
    </HStack>
  );
};
