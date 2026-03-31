import { Menu } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { DropdownDirection } from "shared/types/ui";
import { AppLink } from "../../../AppLink/AppLink";
import { HStack } from "../../../Stack";
import { mapDirectionClass } from "../../styles/consts";
import popupCls from "../../styles/popup.module.scss";
import cls from "./Dropdown.module.scss";

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

export const Dropdown = ({
  className,
  items,
  trigger,
  direction = "bottom right",
}: DropdownProps) => {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap={4} align="center" className={cls.dropdownStack}>
      <Menu
        as="div"
        className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
      >
        <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
        <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
          {items.map((item) => {
            const content = ({ active }: { active: boolean }) => (
              <button
                type="button"
                onClick={item.onClick}
                disabled={item.disabled}
                className={classNames(cls.item, { [popupCls.active]: active })}
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
