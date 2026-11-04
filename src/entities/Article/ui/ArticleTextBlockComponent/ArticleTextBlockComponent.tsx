import { memo } from "react";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Text as TextDeprecated } from "@/shared/ui";
import { ArticleTextBlock } from "../../model/types/article";
import cls from "./ArticleTextBlockComponent.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text/Text";

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  ({ className, block }: ArticleTextBlockComponentProps) => {
    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title && (
          <Text title={block.title} className={cls.title} />
        )}
        {block.paragraphs.map((paragraph) => (
          <Text
            key={paragraph}
            text={paragraph}
            className={cls.paragraph}
          />
        ))}
      </div>
    );
  },
);
