import { FC } from "react";

import AppIcon from "@/shared/assets/icons/Aether_symbol 2.svg";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { HStack } from "../Stack";
import cls from "./AppLogo.module.scss";

interface AppLogoProps {
  className?: string;
}
/** @deprecated */
export const AppLogo: FC<AppLogoProps> = ({ className }) => {
  return (
    <HStack
      max
      justfify="center"
      className={classNames(cls.AppLogoWrapper, {}, [className])}
    >
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
      <AppIcon className={cls.appIcon} />
    </HStack>
  );
};
