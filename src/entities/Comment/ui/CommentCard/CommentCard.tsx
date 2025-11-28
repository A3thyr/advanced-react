import { ArticleComment } from "entities/Comment/model/types/comment";
import { FC } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Avatar, Skeleton, Text } from "shared/ui";
import cls from "./CommentCard.module.scss";

interface CommentCardProps {
  className?: string;
  comment: ArticleComment;
  isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = ({
  className,
  comment,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
          <Skeleton border="50%" height={30} width={30} />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton width="100%" height={50} className={cls.text} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls.header}>
        {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
        <Text className={cls.username} title={comment.user.username} />
      </div>
      <Text className={cls.text} text={comment.text} />
    </div>
  );
};
