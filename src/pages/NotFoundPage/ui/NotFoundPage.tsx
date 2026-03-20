import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { PageLayout } from "widgets";
import cls from "./NotFoundPage.module.scss";

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage: FC<NotFoundPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <PageLayout className={classNames(cls.NotFoundPage, {}, [className])}>
      {t("not-found")}
    </PageLayout>
  );
};
