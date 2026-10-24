import { memo, useCallback } from "react";

import { saveJsonSettings } from "@/entities/User";
import DarkIconDeprecated from "@/shared/assets/icons/theme-dark.svg";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from "@/shared/ui/deprecated/Button/Button";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon/Icon";
import { ToggleFeatures } from "@/shared/lib/features";
import { Icon } from "@/shared/ui";
import ThemeIcon from "@/shared/assets/icons/theme.svg";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggleHandler = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [toggleTheme, dispatch]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<Icon Svg={ThemeIcon} onClick={onToggleHandler} clickable />}
      off={
        <ButtonDeprecated
          theme={ThemeButton.CLEAR}
          className={classNames("", {}, [className])}
          onClick={onToggleHandler}
        >
          <IconDeprecated Svg={DarkIconDeprecated} width={40} height={40} />
        </ButtonDeprecated>
      }
    />
  );
});
