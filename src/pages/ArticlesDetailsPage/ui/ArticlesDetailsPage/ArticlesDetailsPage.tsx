import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./ArticlesDetailsPage.module.scss";

interface ArticlesDetailsPageProps {
  className?: string;
}

const ArticlesDetailsPage: FC<ArticlesDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation("article");
  return (
    <div className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
      {`ARTICLE DETAILS`}
    </div>
  );
};

export default memo(ArticlesDetailsPage);
