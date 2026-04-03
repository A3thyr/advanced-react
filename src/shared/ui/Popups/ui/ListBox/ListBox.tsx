import { Listbox as HListBox } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { DropdownDirection } from "../../../../types/ui";
import { Button } from "../../../Button/Button";
import { HStack } from "../../../Stack";
import { mapDirectionClass } from "../../styles/consts";
import cls from "./ListBox.module.scss";
import popupCls from "../../styles/popup.module.scss";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

// const mapDirectionClass: Record<DropdownDirection, string> = {
//   "bottom left": cls.optionsBottomLeft,
//   "bottom right": cls.optionsBottomRight,
//   "top left": cls.optionsTopLeft,
//   "top right": cls.optionsTopRight,
// };

export function ListBox({
  className,
  items,
  value,
  defaultValue,
  onChange,
  readonly,
  direction = "top right",
  label,
}: ListBoxProps) {
  const optionsClasses = [mapDirectionClass[direction]];

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
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
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
                  })}
                >
                  {selected && "!!!"}
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
