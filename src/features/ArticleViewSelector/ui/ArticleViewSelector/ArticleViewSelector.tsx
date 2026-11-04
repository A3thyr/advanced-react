import { FC } from "react";

import ListIconDeprecated from "@/shared/assets/icons/list-24-24.svg";
import TiledIconDeprecated from "@/shared/assets/icons/tiled-24-24.svg";

import ListIcon from "@/shared/assets/icons/burger.svg";
import TiledIcon from "@/shared/assets/icons/tile.svg";

import { ArticleView } from "@/entities/Article";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Icon } from "@/shared/ui";
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from "@/shared/ui/deprecated/Button/Button";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon/Icon";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { HStack } from "@/shared/ui/redesigned/Stack";
import cls from "./ArticleViewSelector.module.scss";

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onClickView?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    id: "small",
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
  {
    id: "big",
    view: ArticleView.BIG,
    icon: ListIcon,
  },
];

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = ({
  className,
  view,
  onClickView,
}) => {
  const onClick = (newView: ArticleView) => () => {
    onClickView?.(newView);
  };

  return (
    <Card
      className={classNames(cls.ArticleViewSelectorRedesigned, {}, [
                  className,
                ])}
      border="round"
    >
      <HStack gap={8}>
        {viewTypes.map((viewType) => (
          <Icon
            key={viewType.id}
            Svg={viewType.icon}
            width={24}
            height={24}
            clickable
            onClick={onClick(viewType.view)}
            className={classNames(
                        "",
                        { [cls.notSelected]: viewType.view !== view },
                        [],
                      )}
          />
                  ))}
      </HStack>
    </Card>
  );
};
