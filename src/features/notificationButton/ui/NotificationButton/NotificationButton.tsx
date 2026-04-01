import { NotificationList } from "entities/Notification";
import { FC } from "react";
import NotificationIcon from "shared/assets/icons/notification-20-20.svg";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Button, Icon, ThemeButton } from "shared/ui";
import { Popover } from "shared/ui/Popups";
import cls from "./NotificationButton.module.scss";

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton: FC<NotificationButtonProps> = ({
  className,
}) => {
  return (
    <Popover
      direction="bottom left"
      className={classNames(cls.NotificationButton, {}, [className])}
      trigger={
        <Button theme={ThemeButton.CLEAR}>
          <Icon Svg={NotificationIcon} inverted />
        </Button>
      }
    >
      <NotificationList className={cls.notifications} />
    </Popover>
  );
};
