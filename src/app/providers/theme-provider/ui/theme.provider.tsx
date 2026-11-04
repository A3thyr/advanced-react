import { FC, ReactNode, useEffect, useMemo, useState } from "react";

import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localStorage";
import { Theme } from "@/shared/const/theme";
import { ThemeContext } from "../../../../shared/lib/context/theme.context";

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const [isThemeInited, setIsThemeInited] = useState(false);

  const [theme, setTheme] = useState<Theme>(
    initialTheme || fallbackTheme || Theme.LIGHT,
  );

  // TODO: workaround, localstorage messes up the UI logic, fix this
  useEffect(() => {
    if (!isThemeInited && initialTheme) {
      setTheme(initialTheme);
      setIsThemeInited(true);
    }
  }, [initialTheme, isThemeInited]);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
