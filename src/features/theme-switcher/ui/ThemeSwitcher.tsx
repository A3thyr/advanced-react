import { memo, useCallback } from "react";

import { saveJsonSettings } from "@/entities/User";
import DarkIcon from "@/shared/assets/icons/theme-dark.svg";
import LightIcon from "@/shared/assets/icons/theme-light.svg";
import { Theme } from "@/shared/const/theme";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Button, ThemeButton } from "@/shared/ui";

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
    <Button
      theme={ThemeButton.CLEAR}
      className={classNames("", {}, [className])}
      onClick={onToggleHandler}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
});
