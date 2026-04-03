import { FC } from "react";
import ListIcon from "@/shared/assets/icons/list-24-24.svg";
import TiledIcon from "@/shared/assets/icons/tiled-24-24.svg";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Button, Icon, ThemeButton } from "@/shared/ui";
import { ArticleView } from "../../model/const/articleConst";
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
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          key={viewType.id}
          theme={ThemeButton.CLEAR}
          onClick={onClick(viewType.view)}
        >
          <Icon
            Svg={viewType.icon}
            className={classNames(
              "",
              { [cls.notSelected]: viewType.view !== view },
              [],
            )}
          />
        </Button>
      ))}
    </div>
  );
};
