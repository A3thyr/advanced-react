import { CSSProperties, memo } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import cls from "./Skeleton.module.scss";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

export const Skeleton = memo(
  ({ className, height, width, border }: SkeletonProps) => {
    const styles: CSSProperties = {
      width,
      height,
      borderRadius: border,
    };
    return (
      <div
        style={styles}
        className={classNames(cls.Skeleton, {}, [className])}
      />
    );
  },
);
