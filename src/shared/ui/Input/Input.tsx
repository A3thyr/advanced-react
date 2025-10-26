import { ChangeEvent, FC, InputHTMLAttributes, memo } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./Input.module.scss";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
  const { onChange, value, className, type = "text", ...otherProps } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classNames(cls.Input, {}, [className])}>
      <input type={type} value={value} onChange={onChangeHandler} />
    </div>
  );
});
