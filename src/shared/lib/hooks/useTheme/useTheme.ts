import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY } from "../../../const/localStorage";
import { Theme } from "../../../const/theme";
import { ThemeContext } from "../../context/theme.context";

interface UseThemeRes {
  theme: Theme;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeRes {
  const { setTheme, theme } = useContext(ThemeContext);

  const toggleTheme = () => {
    let newTheme;
    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT;
        break;
      case Theme.LIGHT:
        newTheme = Theme.ORANGE;
        break;
      case Theme.ORANGE:
        newTheme = Theme.DARK;
        break;
      default:
        newTheme = Theme.LIGHT;
        break;
    }
    setTheme?.(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return { theme: theme || Theme.LIGHT, toggleTheme };
}
