import { FC } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./Icon.module.scss";

interface IconProps {
  className?: string;
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

export const Icon: FC<IconProps> = ({ className, Svg }) => {
  return <Svg className={classNames(cls.Icon, {}, [className])} />;
};
