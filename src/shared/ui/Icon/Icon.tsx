import { FC, SVGProps } from "react";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import cls from "./Icon.module.scss";

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  inverted?: boolean;
}

export const Icon: FC<IconProps> = ({ className, Svg, inverted, ...props }) => {
  return (
    <Svg
      className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
        className,
      ])}
      {...props}
    />
  );
};
