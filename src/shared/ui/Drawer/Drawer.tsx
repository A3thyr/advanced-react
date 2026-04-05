// import { a, useSpring } from "@react-spring/web";
// import { useDrag } from "@use-gesture/react";
import { FC, ReactNode, useCallback, useEffect } from "react";
import {
  AnimationProvider,
  useAnimationModules,
} from "@/shared/lib/components/AnimationProvider";
import {
  classNames,
  Mods,
} from "@/shared/lib/helpers/classNames/classNames.helper";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { Overlay } from "../Overlay/Overlay";
import { Portal } from "../Portal/Portal";
import cls from "./Drawer.module.scss";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const height = window.innerHeight - 100;

export const DrawerContent: FC<DrawerProps> = ({
  className,
  children,
  isOpen,
  onClose,
  lazy,
}) => {
  const { Gesture, Spring } = useAnimationModules();
  const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
  const {
    // close: closeOverlay,
    isClosing,
    isMounted,
  } = useModal({
    animationDelay: 300,
    isOpen,
    onClose,
  });
  const { theme } = useTheme();

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  const openDrawer = useCallback(() => {
    api.start({ y: 0, immediate: false });
  }, [api]);

  useEffect(() => {
    if (isOpen) openDrawer();
  }, [isOpen, openDrawer]);

  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...Spring.config.stiff, velocity },
      onResolve: onClose,
    });
  };

  const bind = Gesture.useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
    }) => {
      if (my < -70) cancel();

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close();
        } else {
          openDrawer();
        }
      } else {
        api.start({ y: my, immediate: true });
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    },
  );

  if (!isOpen) return null;

  const display = y.to((py) => (py < height ? "block" : "none"));

  if (lazy && !isMounted) return null;

  return (
    <Portal>
      <div
        className={classNames(cls.Drawer, mods, [
          className,
          theme,
          "app_drawer",
        ])}
      >
        <Overlay onClick={close} />
        <Spring.a.div
          className={cls.sheet}
          style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
          {...bind()}
        >
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  );
};

const DrawerAsync: FC<DrawerProps> = (props) => {
  const { isLoaded } = useAnimationModules();

  if (!isLoaded) return null;

  return <DrawerContent {...props} />;
};

export const Drawer: FC<DrawerProps> = (props) => {
  return (
    <AnimationProvider>
      <DrawerAsync {...props} />
    </AnimationProvider>
  );
};
