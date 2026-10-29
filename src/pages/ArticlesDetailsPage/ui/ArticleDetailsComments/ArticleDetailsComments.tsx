import { FC, Suspense, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AddCommentForm } from "@/features/addCommentForm";
import { CommentList } from "@/entities/Comment";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { VStack } from "@/shared/ui/redesigned/Stack";
import {
  Text as TextDeprecated,
  TextSize,
} from "@/shared/ui/deprecated/Text/Text";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text/Text";

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments: FC<ArticleDetailsCommentsProps> = ({
  className,
  id,
}) => {
  const { t } = useTranslation("article_details");
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const comments = useSelector(getArticleComments.selectAll);
  const dispatch = useAppDispatch();

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  return (
    <VStack gap={8} max className={classNames("", {}, [className])}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<Text size={"l"} title={t("comment-title")} />}
        off={<TextDeprecated size={TextSize.L} title={t("comment-title")} />}
      />

      <Suspense fallback={t("loading")}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>
      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </VStack>
  );
};
