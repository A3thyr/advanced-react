import { ChangeEvent, useMemo } from "react";
import {
  classNames,
  Mods,
} from "@/shared/lib/helpers/classNames/classNames.helper";
import cls from "./Select.module.scss";

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const Select = <T extends string>({
  className,
  label,
  options,
  onChange,
  value,
  readonly,
}: SelectProps<T>) => {
  const mods: Mods = {};

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };

  const optionsList = useMemo(
    () =>
      options?.map((opt) => (
        <option key={opt.value} value={opt.value} className={cls.option}>
          {opt.content}
        </option>
      )),
    [options],
  );

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <select
        disabled={readonly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
};
