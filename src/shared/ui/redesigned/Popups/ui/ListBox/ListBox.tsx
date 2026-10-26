import { Listbox as HListBox } from "@headlessui/react";
import { Fragment, ReactNode, useMemo } from "react";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { DropdownDirection } from "../../../../../types/ui";
import { Button } from "../../../../redesigned/Button/Button";
import { HStack } from "../../../../redesigned/Stack";
import { mapDirectionClass } from "../../styles/consts";
import cls from "./ListBox.module.scss";
import popupCls from "../../styles/popup.module.scss";
import { Icon } from "../../../Icon/Icon";
import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg";

export interface ListBoxItem<T extends string> {
  value: T;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[];
  className?: string;
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export function ListBox<T extends string>({
  className,
  items,
  value,
  defaultValue,
  onChange,
  readonly,
  direction = "top right",
  label,
}: ListBoxProps<T>) {
  const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [items, value]);

  return (
    <HStack gap={4} align="center">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button disabled={readonly} className={popupCls.trigger}>
          <Button
            variant="filled"
            disabled={readonly}
            addonRight={<Icon Svg={ArrowIcon} />}
          >
            {selectedItem?.content ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled,
                    [popupCls.selected]: selected,
                  })}
                >
                  {selected}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
}
