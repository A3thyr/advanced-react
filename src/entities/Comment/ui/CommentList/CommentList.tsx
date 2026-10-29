import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Text as TextDeprecated } from "@/shared/ui";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { ArticleComment } from "../../model/types/comment";
import { CommentCard } from "../CommentCard/CommentCard";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text/Text";

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

  if (isLoading) {
    return (
      <VStack max gap={16} className={classNames("", {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack max gap={16} className={classNames("", {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            isLoading={isLoading}
            comment={comment}
          />
        ))
      ) : (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text text={t("no-comment")} />}
          off={<TextDeprecated text={t("no-comment")} />}
        />
      )}
    </VStack>
  );
};
