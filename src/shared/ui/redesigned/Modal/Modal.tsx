import { FC, ReactNode } from "react";
import {
  classNames,
  Mods,
} from "@/shared/lib/helpers/classNames/classNames.helper";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { useTheme } from "../../../lib/hooks/useTheme/useTheme";
import { Overlay } from "../Overlay/Overlay";
import { Portal } from "../Portal/Portal";
import cls from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = ({
  className,
  children,
  onClose,
  isOpen,
  lazy,
}) => {
  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    isOpen,
    onClose,
  });
  const { theme } = useTheme();

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) return null;

  return (
    <Portal element={document.getElementById("app") ?? document.body}>
      <div
        className={classNames(cls.Modal, mods, [
          className,
          theme,
          "app_modal",
          cls.modalNew,
        ])}
      >
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
