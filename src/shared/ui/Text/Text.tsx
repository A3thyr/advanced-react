import { FC } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./Text.module.scss";

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
}

export const Text: FC<TextProps> = ({ className, text, title }) => {
  return (
    <div className={classNames(cls.Text, {}, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
};
