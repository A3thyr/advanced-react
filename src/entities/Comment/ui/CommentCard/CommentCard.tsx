import { FC } from "react";
import { getRouteProfile } from "@/shared/const/router";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { AppLink, Skeleton } from "@/shared/ui";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { ArticleComment } from "../../model/types/comment";
import cls from "./CommentCard.module.scss";

interface CommentCardProps {
  className?: string;
  comment?: ArticleComment;
  isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = ({
  className,
  comment,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <VStack
        data-testid="CommentCard.Loading"
        gap={8}
        max
        className={classNames(cls.CommentCard, {}, [className])}
      >
        <div className={cls.header}>
          <Skeleton border="50%" height={30} width={30} />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton width="100%" height={50} className={cls.text} />
      </VStack>
    );
  }

  if (!comment) return null;

  return (
    <Card padding={24} border="partial" max>
      <VStack
        data-testid="CommentCard.Content"
        gap={8}
        max
        className={classNames(cls.CommentCardRedesigned, {}, [
          className,
          cls.loading,
        ])}
      >
        <AppLink to={getRouteProfile(comment.user.id)} className={cls.header}>
          <HStack gap={8} align="center">
            {comment.user.avatar && (
              <Avatar size={30} src={comment.user.avatar} />
            )}
            <Text bold text={comment.user.username} />
          </HStack>
        </AppLink>
        <Text className={cls.text} text={comment.text} />
      </VStack>
    </Card>
  );
};
