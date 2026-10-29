import { FC, useCallback } from "react";

import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";

import CopyIconNew from "../../../assets/icons/copy.svg";
import { Icon } from "../Icon/Icon";
import cls from "./Code.module.scss";

interface CodeProps {
  className?: string;
  text: string;
}

export const Code: FC<CodeProps> = ({ className, text }) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
      <Icon
        clickable
        onClick={onCopy}
        className={cls.copyBtn}
        Svg={CopyIconNew}
      />
      <code>{text}</code>
    </pre>
  );
};
