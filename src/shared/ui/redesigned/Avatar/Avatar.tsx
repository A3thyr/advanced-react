import { CSSProperties, FC, useMemo } from "react";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import cls from "./Avatar.module.scss";
import { AppImage } from "../../redesigned/AppImage/AppImage";
import UserIcon from "../../../assets/icons/user-filled.svg";
import { Skeleton } from "../Skeleton/Skeleton";
import { Icon } from "../Icon/Icon";

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar: FC<AvatarProps> = ({ className, src, size, alt }) => {
  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);

  const fallback = <Skeleton width={size} height={size} border="50%" />;

  const errorFallback = <Icon width={size} height={size} Svg={UserIcon} />;

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
