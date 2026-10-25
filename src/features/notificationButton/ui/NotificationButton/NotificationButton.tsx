import { BrowserView, MobileView } from "react-device-detect";
import { FC, useCallback, useState } from "react";
import { NotificationList } from "@/entities/Notification";
import NotificationIconDeprecated from "@/shared/assets/icons/notification-20-20.svg";
import NotificationIcon from "@/shared/assets/icons/notification.svg";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
// import { Button, Drawer, Icon, ThemeButton } from "@/shared/ui";
import { Popover as PopoverDeprecated } from "@/shared/ui/deprecated/Popups";
import cls from "./NotificationButton.module.scss";
import {
  Button as ButtonDeprecated,
  ThemeButton as ThemeButtonDeprecated,
} from "@/shared/ui/deprecated/Button/Button";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon/Icon";
import { Drawer } from "@/shared/ui/deprecated/Drawer/Drawer";
import { ToggleFeatures } from "@/shared/lib/features";
import { Icon } from "@/shared/ui";
import { Popover } from "@/shared/ui/redesigned/Popups";

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton: FC<NotificationButtonProps> = ({
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const trigger = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />}
      off={
        <ButtonDeprecated
          onClick={onOpenDrawer}
          theme={ThemeButtonDeprecated.CLEAR}
        >
          <IconDeprecated Svg={NotificationIconDeprecated} inverted />
        </ButtonDeprecated>
      }
    />
  );

  return (
    <div>
      <BrowserView>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Popover
              direction="bottom left"
              className={classNames(cls.NotificationButton, {}, [className])}
              trigger={trigger}
            >
              <NotificationList className={cls.notifications} />
            </Popover>
          }
          off={
            <PopoverDeprecated
              direction="bottom left"
              className={classNames(cls.NotificationButton, {}, [className])}
              trigger={trigger}
            >
              <NotificationList className={cls.notifications} />
            </PopoverDeprecated>
          }
        />
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  );
};
