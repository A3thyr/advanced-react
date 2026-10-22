import { FC, ReactNode, useEffect, useMemo, useState } from "react";

import { Theme } from "@/shared/const/theme";
import { ThemeContext } from "../../../../shared/lib/context/theme.context";
import { useJsonSettings } from "@/entities/User";

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const { theme: defaultTheme = Theme.LIGHT } = useJsonSettings();
  const [isThemeInited, setIsThemeInited] = useState(false);

  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  // TODO: workaround, localstorage messes up the UI logic, fix this
  useEffect(() => {
    if (!isThemeInited) {
      setTheme(defaultTheme);
      setIsThemeInited(true);
    }
  }, [defaultTheme, isThemeInited]);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
