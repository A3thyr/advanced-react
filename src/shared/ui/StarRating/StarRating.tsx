import { FC, useState } from "react";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import StarIcon from "../../assets/icons/star.svg";
import { Icon } from "../Icon/Icon";
import cls from "./StarRating.module.scss";

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating: FC<StarRatingProps> = ({
  className,
  onSelect,
  selectedStars = 0,
  size = 30,
}) => {
  const [currentStarsCount, setCurrentStarsCount] =
    useState<number>(selectedStars);
  const [isSelected, setIsSelected] = useState<boolean>(Boolean(selectedStars));

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };
  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const onClick = (starCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starCount);
      setCurrentStarsCount(starCount);
      setIsSelected(true);
    }
  };

  return (
    <div className={classNames(cls.StarRating, {}, [className])}>
      {stars.map((starNumber) => (
        <Icon
          className={classNames(
            cls.starIcon,
            {
              [cls.selected]: isSelected,
            },
            [currentStarsCount >= starNumber ? cls.hovered : cls.normal],
          )}
          Svg={StarIcon}
          key={starNumber}
          width={size}
          height={size}
          onMouseLeave={onLeave}
          onMouseEnter={onHover(starNumber)}
          onClick={onClick(starNumber)}
          data-testid={`StarRating.${starNumber}`}
          data-selected={currentStarsCount >= starNumber}
        />
      ))}
    </div>
  );
};
