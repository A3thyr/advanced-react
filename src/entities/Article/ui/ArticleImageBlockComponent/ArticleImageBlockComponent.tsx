import { memo } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./ArticleImageBlockComponent.module.scss";

interface ArticleImageBlockComponentProps {
  className?: string;
}

export const ArticleImageBlockComponent = memo(
  ({ className }: ArticleImageBlockComponentProps) => {
    return (
      <div
        className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
      >
        {`ArticleImageBlockComponent`}
      </div>
    );
  }
);
