import { ArticleDetails } from "entities/Article";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./ArticlesDetailsPage.module.scss";

interface ArticlesDetailsPageProps {
  className?: string;
}

const ArticlesDetailsPage: FC<ArticlesDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation("article_details");
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
        {t("not-found")}
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticlesDetailsPage);
