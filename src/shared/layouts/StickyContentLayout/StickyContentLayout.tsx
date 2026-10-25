import { FC, ReactElement } from "react";
import cls from "./StickyContentLayout.module.scss";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";

interface StickyContentLayoutProps {
  className?: string;
  left?: ReactElement;
  content: ReactElement;
  right?: ReactElement;
}

export const StickyContentLayout: FC<StickyContentLayoutProps> = ({
  className,
  content,
  left,
  right,
}) => {
  return (
    <div className={classNames(cls.StickyContentLayout, {}, [className])}>
      {left && <div className={cls.left}>{left}</div>}
      <div className={cls.content}>{content}</div>
      {right && <div className={cls.right}>{right}</div>}
    </div>
  );
};
