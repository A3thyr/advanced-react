import { FC } from "react";
import { useTranslation } from "react-i18next";

import { User } from "@/entities/User";
import { ArticleEditBtn } from "@/features/articleEditBtn";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import cls from "./ArticleAdditionalInfo.module.scss";

interface ArticleAdditionalInfoProps {
  className?: string;
  author: User;
  createdAt: string;
  views: number;
}

export const ArticleAdditionalInfo: FC<ArticleAdditionalInfoProps> = ({
  className,
  author,
  createdAt,
  views,
}) => {
  const { t } = useTranslation();
  return (
    <VStack
      gap={32}
      className={classNames(cls.ArticleAdditionalInfo, {}, [className])}
    >
      <HStack gap={8} align="center">
        <Avatar src={author.avatar} size={32} />
        <Text text={author.username} bold />
        <Text text={createdAt} />
      </HStack>
      <ArticleEditBtn />
      <Text text={t("{{count}} views", { count: views })} />
    </VStack>
  );
};
