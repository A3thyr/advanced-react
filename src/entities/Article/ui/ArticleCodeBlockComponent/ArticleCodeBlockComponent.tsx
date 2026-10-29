import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Code as CodeDeprecated } from "@/shared/ui";
import { ArticleCodeBlock } from "../../model/types/article";
import cls from "./ArticleCodeBlockComponent.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Code } from "@/shared/ui/redesigned/Code/Code";

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
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<Code text={block.code} />}
        off={<CodeDeprecated text={block.code} />}
      />
    </div>
  );
};
