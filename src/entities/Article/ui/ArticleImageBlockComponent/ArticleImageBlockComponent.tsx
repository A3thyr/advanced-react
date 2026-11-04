import { memo } from "react";

import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { ArticleImageBlock } from "../../model/types/article";
import cls from "./ArticleImageBlockComponent.module.scss";

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  ({ className, block }: ArticleImageBlockComponentProps) => {
    return (
      <div
        className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
      >
        <img src={block.src} alt={block.title} className={cls.img} />
        {block.title && <Text text={block.title} align={"center"} />}
      </div>
    );
  },
);
