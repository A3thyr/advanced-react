import { CSSProperties, FC, useMemo } from "react";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import cls from "./Avatar.module.scss";
import { AppImage } from "../AppImage/AppImage";
import UserIcon from "../../assets/icons/user-filled.svg";
import { Icon } from "../Icon/Icon";
import { Skeleton } from "../Skeleton/Skeleton";

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

export const Avatar: FC<AvatarProps> = ({
  className,
  src,
  size,
  alt,
  fallbackInverted,
}) => {
  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);

  const fallback = <Skeleton width={size} height={size} border="50%" />;

  const errorFallback = (
    <Icon
      inverted={fallbackInverted}
      width={size}
      height={size}
      Svg={UserIcon}
    />
  );

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      style={styles}
      alt={alt}
      className={classNames(cls.Avatar, {}, [className])}
    />
  );
};
