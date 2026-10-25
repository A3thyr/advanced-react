import { FC } from "react";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import {
  AppLink,
  Card as CardDeprecated,
  Text as TextDeprecated,
} from "@/shared/ui";
import { CardTheme } from "@/shared/ui/deprecated/Card/Card";
import { Notification } from "../../model/types/NotificationSchema";
import cls from "./NotificationItem.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { Text } from "@/shared/ui/redesigned/Text/Text";

interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem: FC<NotificationItemProps> = ({
  className,
  notification,
}) => {
  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card className={classNames(cls.NotificationItem, {}, [className])}>
          <Text title={notification.title} text={notification.description} />
        </Card>
      }
      off={
        <CardDeprecated
          theme={CardTheme.OUTLINED}
          className={classNames(cls.NotificationItem, {}, [className])}
        >
          <TextDeprecated
            title={notification.title}
            text={notification.description}
          />
        </CardDeprecated>
      }
    />
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
