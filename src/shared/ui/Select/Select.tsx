import { ChangeEvent, memo, useMemo } from "react";
import {
  classNames,
  Mods,
} from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./Select.module.scss";

export interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select = memo(
  ({ className, label, options, onChange, value, readonly }: SelectProps) => {
    const mods: Mods = {};

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

    const optionsList = useMemo(
      () =>
        options?.map((opt) => (
          <option key={opt.value} value={opt.value} className={cls.option}>
            {opt.content}
          </option>
        )),
      [options]
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
  }
);
