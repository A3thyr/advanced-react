import { useTheme } from "app/providers/theme-provider";
import {
  FC,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Portal } from "../Portal/Portal";
import cls from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = ({
  className,
  children,
  onClose,
  isOpen,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const { theme } = useTheme();

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHandler();
      }
    },
    [closeHandler]
  );

  const onContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return (
    <Portal>
      <div
        className={classNames(cls.Modal, mods, [className, theme, "app_modal"])}
      >
        <div role="dialog" onClick={closeHandler} className={cls.overlay}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
