import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { PageLayout } from "@/widgets";
import cls from "./ArticleEditPage.module.scss";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage: FC<ArticleEditPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <PageLayout className={classNames(cls.ArticleEditPage, {}, [className])}>
      {isEdit
        ? `${t("article-edit-page")} id - ${id}`
        : t("article-create-page")}
    </PageLayout>
  );
};

export default ArticleEditPage;
