import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getArticleDetailsData } from "@/entities/Article";
import { getRouteArticlesEdit } from "@/shared/const/router";
import { Button } from "@/shared/ui";

export const ArticleEditBtn: FC = () => {
  const { t } = useTranslation("article_details");
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);

  const onEditArticle = useCallback(() => {
    if (article) navigate(getRouteArticlesEdit(article?.id));
  }, [navigate, article]);

  return <Button onClick={onEditArticle}>{t("edit")}</Button>;
};
