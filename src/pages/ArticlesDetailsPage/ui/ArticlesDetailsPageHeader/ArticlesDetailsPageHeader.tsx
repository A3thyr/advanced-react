import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArticleEditBtn } from "@/features/articleEditBtn";
import { getRouteArticles } from "@/shared/const/router";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { ThemeButton } from "@/shared/ui";
import { Button } from "@/shared/ui/deprecated/Button/Button";
import { HStack } from "@/shared/ui/redesigned/Stack";

import { getCanEditArticle } from "../../model/selectors/articles";

interface ArticlesDetailsPageHeaderProps {
  className?: string;
}

export const ArticlesDetailsPageHeader: FC<ArticlesDetailsPageHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation("article_details");
  const navigate = useNavigate();
  const canEdit = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  return (
    <HStack max justfify="between" className={classNames("", {}, [className])}>
      <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
        {t("header.back")}
      </Button>
      {canEdit && <ArticleEditBtn />}
    </HStack>
  );
};
