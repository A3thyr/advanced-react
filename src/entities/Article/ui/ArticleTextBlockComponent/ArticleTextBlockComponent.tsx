import { memo } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./ArticleTextBlockComponent.module.scss";

interface ArticleTextBlockComponentProps {
  className?: string;
}

export const ArticleTextBlockComponent = memo(
  ({ className }: ArticleTextBlockComponentProps) => {
    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
      >
        {`ArticleTextBlockComponent`}
      </div>
    );
  }
);
