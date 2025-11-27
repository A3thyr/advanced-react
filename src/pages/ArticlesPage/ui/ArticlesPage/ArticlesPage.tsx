import { FC, memo } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./ArticlesPage.module.scss";

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      {`ARTICLES PAGE`}
    </div>
  );
};

export default memo(ArticlesPage);
