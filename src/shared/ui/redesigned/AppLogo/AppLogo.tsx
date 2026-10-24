import { FC } from "react";

import AppIcon from "@/shared/assets/icons/Aether_symbol 2.svg";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { HStack } from "../../deprecated/Stack";
import cls from "./AppLogo.module.scss";

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo: FC<AppLogoProps> = ({ className, size = 55 }) => {
  return (
    <HStack
      max
      justfify="center"
      className={classNames(cls.AppLogoWrapper, {}, [className])}
    >
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
      <AppIcon
        className={cls.appIcon}
        width={size}
        height={size}
        color="black"
      />
    </HStack>
  );
};
