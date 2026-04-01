import { FC } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Skeleton } from "shared/ui";
import { VStack } from "shared/ui/Stack";
import { useNotificationsList } from "../../api/notificationApi";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import cls from "./NotificationList.module.scss";

interface NotificationListProps {
  className?: string;
}

export const NotificationList: FC<NotificationListProps> = ({ className }) => {
  const { data: notifications, isLoading } = useNotificationsList(null, {
    pollingInterval: 10000,
  });

  if (isLoading) {
    return (
      <VStack
        gap={16}
        max
        className={classNames(cls.NotificationList, {}, [className])}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={`skeleton-notification-${i}`}
            width="100%"
            border="8px"
            height="80px"
          />
        ))}
      </VStack>
    );
  }

  return (
    <VStack
      gap={16}
      max
      className={classNames(cls.NotificationList, {}, [className])}
    >
      {notifications?.map((item) => (
        <NotificationItem key={item.id} notification={item} />
      ))}
    </VStack>
  );
};
