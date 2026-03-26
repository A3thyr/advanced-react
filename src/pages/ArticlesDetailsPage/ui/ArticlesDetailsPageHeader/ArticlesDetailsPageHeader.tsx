import { getArticleDetailsData } from "entities/Article";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/router/router.config";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Button, ThemeButton } from "shared/ui";
import { getCanEditArticle } from "../../model/selectors/articles";
import cls from "./ArticlesDetailsPageHeader.module.scss";

interface ArticlesDetailsPageHeaderProps {
  className?: string;
}

export const ArticlesDetailsPageHeader: FC<ArticlesDetailsPageHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation("article_details");
  const navigate = useNavigate();
  const canEdit = useSelector(getCanEditArticle);
  const article = useSelector(getArticleDetailsData);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles_details);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.articles_details}${article?.id}/edit`);
  }, [navigate, article?.id]);

  return (
    <div className={classNames(cls.ArticlesDetailsPageHeader, {}, [className])}>
      <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
        {t("header.back")}
      </Button>
      {canEdit && (
        <Button
          className={cls.editBtn}
          theme={ThemeButton.OUTLINE}
          onClick={onEditArticle}
        >
          {t("header.edit")}
        </Button>
      )}
    </div>
  );
};
