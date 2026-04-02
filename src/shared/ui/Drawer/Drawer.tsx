import { useTheme } from "app/providers/theme-provider";
import { FC, ReactNode } from "react";
import {
  classNames,
  Mods,
} from "shared/lib/helpers/classNames/classNames.helper";
import { Portal } from "../Portal/Portal";
import cls from "./Drawer.module.scss";
import { Overlay } from "../Overlay/Overlay";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer: FC<DrawerProps> = ({
  className,
  children,
  isOpen,
  onClose,
}) => {
  const { theme } = useTheme();

  const mods: Mods = {
    [cls.opened]: isOpen,
  };

  return (
    <Portal>
      <div
        className={classNames(cls.Drawer, mods, [
          className,
          theme,
          "app_drawer",
        ])}
      >
        <Overlay onClick={onClose} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
