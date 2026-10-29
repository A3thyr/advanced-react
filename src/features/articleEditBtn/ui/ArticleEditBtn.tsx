import { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getArticleDetailsData } from "@/entities/Article";
import { getRouteArticlesEdit } from "@/shared/const/router";
import { ToggleFeatures } from "@/shared/lib/features";
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from "@/shared/ui/deprecated/Button/Button";
import { Button } from "@/shared/ui";

export const ArticleEditBtn: FC = () => {
  const { t } = useTranslation("article_details");
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);

  const onEditArticle = useCallback(() => {
    if (article) navigate(getRouteArticlesEdit(article?.id));
  }, [navigate, article]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<Button onClick={onEditArticle}>{t("edit")}</Button>}
      off={
        <ButtonDeprecated theme={ThemeButton.OUTLINE} onClick={onEditArticle}>
          {t("header.edit")}
        </ButtonDeprecated>
      }
    />
  );
};
