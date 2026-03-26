import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Code } from "shared/ui";
import { ArticleCodeBlock } from "../../model/types/article";
import cls from "./ArticleCodeBlockComponent.module.scss";

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = ({
  className,
  block,
}: ArticleCodeBlockComponentProps) => {
  return (
    <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
      <Code text={block.code} />
    </div>
  );
};
