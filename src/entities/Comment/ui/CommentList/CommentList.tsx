import { ArticleComment } from "entities/Comment/model/types/comment";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Text } from "shared/ui";
import { CommentCard } from "../CommentCard/CommentCard";
import cls from "./CommentList.module.scss";

interface CommentListProps {
  className?: string;
  comments?: ArticleComment[];
  isLoading?: boolean;
}

export const CommentList: FC<CommentListProps> = ({
  className,
  comments,
  isLoading,
}) => {
  const { t } = useTranslation("article_details");
  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            isLoading={isLoading}
            className={cls.comment}
            comment={comment}
          />
        ))
      ) : (
        <Text text={t("no-comment")} />
      )}
    </div>
  );
};
