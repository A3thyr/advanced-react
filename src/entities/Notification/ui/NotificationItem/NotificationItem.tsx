import { FC } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { AppLink, Card, Text } from "shared/ui";
import { CardTheme } from "shared/ui/Card/Card";
import { Notification } from "../../model/types/NotificationSchema";
import cls from "./NotificationItem.module.scss";

interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem: FC<NotificationItemProps> = ({
  className,
  notification,
}) => {
  const content = (
    <Card
      theme={CardTheme.OUTLINED}
      className={classNames(cls.NotificationItem, {}, [className])}
    >
      <Text title={notification.title} text={notification.description} />
    </Card>
  );

  if (notification.href) {
    return (
      <AppLink
        target="_blank"
        to={notification.href}
        replace
        className={cls.link}
      >
        {content}
      </AppLink>
    );
  }

  return <>{content}</>;
};
