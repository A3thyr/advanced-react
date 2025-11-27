import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./ArticleCodeBlockComponent.module.scss";

interface ArticleCodeBlockComponentProps {
  className?: string;
}

export const ArticleCodeBlockComponent = ({
  className,
}: ArticleCodeBlockComponentProps) => {
  return (
    <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
      {`ArticleCodeBlockComponent`}
    </div>
  );
};
