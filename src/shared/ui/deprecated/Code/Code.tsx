import { FC, useCallback } from "react";
import CopyIcon from "@/shared/assets/icons/copy-20-20.svg";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Button } from "../../deprecated/Button/Button";

import cls from "./Code.module.scss";
import { ThemeButton } from "../Button/Button";

interface CodeProps {
  className?: string;
  text: string;
}
/** @deprecated */
export const Code: FC<CodeProps> = ({ className, text }) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button
        onClick={onCopy}
        className={cls.copyBtn}
        theme={ThemeButton.CLEAR}
      >
        <CopyIcon className={cls.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  );
};
