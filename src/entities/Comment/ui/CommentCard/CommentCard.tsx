import { FC } from "react";
import { getRouteProfile } from "@/shared/const/router";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import {
  AppLink,
  Avatar as AvatarDeprecated,
  Skeleton,
  Text as TextDeprecated,
} from "@/shared/ui";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { ArticleComment } from "../../model/types/comment";
import cls from "./CommentCard.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";
import { Text } from "@/shared/ui/redesigned/Text/Text";

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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card padding={24} border="round" max>
          <VStack
            data-testid="CommentCard.Content"
            gap={8}
            max
            className={classNames(cls.CommentCardRedesigned, {}, [
              className,
              cls.loading,
            ])}
          >
            <AppLink
              to={getRouteProfile(comment.user.id)}
              className={cls.header}
            >
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
      }
      off={
        <VStack
          data-testid="CommentCard.Content"
          gap={8}
          max
          className={classNames(cls.CommentCard, {}, [className, cls.loading])}
        >
          <AppLink to={getRouteProfile(comment.user.id)} className={cls.header}>
            {comment.user.avatar && (
              <AvatarDeprecated size={30} src={comment.user.avatar} />
            )}
            <TextDeprecated
              className={cls.username}
              title={comment.user.username}
            />
          </AppLink>
          <TextDeprecated className={cls.text} text={comment.text} />
        </VStack>
      }
    />
  );
};
