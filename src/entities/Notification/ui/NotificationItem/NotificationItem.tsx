import { FC } from "react";

import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { AppLink } from "@/shared/ui";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { Text } from "@/shared/ui/redesigned/Text/Text";
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
    <Card className={classNames(cls.NotificationItem, {}, [className])}>
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
