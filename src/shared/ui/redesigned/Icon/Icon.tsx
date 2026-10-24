import { SVGProps } from "react";

import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import cls from "./Icon.module.scss";

type SvgProps = Omit<SVGProps<SVGSVGElement>, "onClick">;

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false;
  onClick?: never;
}

interface ClickableIconProps extends IconBaseProps {
  clickable: true;
  onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = ({
  className,
  Svg,
  width = 32,
  height = 32,
  clickable,
  onClick,
  ...props
}: IconProps) => {
  const icon = (
    <Svg
      height={height}
      width={width}
      className={classNames(cls.Icon, {}, [className])}
      {...props}
    />
  );

  if (clickable) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cls.button}
        style={{ height, width }}
      >
        {icon}
      </button>
    );
  }

  return icon;
};
