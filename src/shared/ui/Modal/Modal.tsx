import { FC, ReactNode, useState } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({
  className,
  children,
  onClose,
  isOpen,
}) => {
  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
  };

  const closeHandler = () => {
    if (onClose) onClose();
  };

  const onContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={classNames(cls.Modal, mods, [className])}>
      <div role="dialog" onClick={closeHandler} className={cls.overlay}>
        <div className={cls.content} onClick={onContentClick}>
          {children}
        </div>
      </div>
    </div>
  );
};
