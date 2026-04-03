import { FC } from "react";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { Spinner } from "@/shared/ui";
import cls from "./PageLoader.module.scss";

interface PageLoaderProps {
  className?: string;
}

export const PageLoader: FC<PageLoaderProps> = ({ className }) => {
  return (
    <div className={classNames(cls.PageLoader, {}, [className])}>
      <Spinner />
    </div>
  );
};
