import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import {
  Button as ButtonDepreacted,
  ThemeButton,
} from "@/shared/ui/deprecated/Button/Button";
import { ToggleFeatures } from "@/shared/lib/features";
import { Button } from "@/shared/ui";

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation("translation");

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
    // localStorage.setItem("i18nextLng", i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Button variant="clear" onClick={toggleLanguage}>
          {t(short ? "short-lang-key" : "language")}
        </Button>
      }
      off={
        <ButtonDepreacted
          theme={ThemeButton.CLEAR}
          onClick={toggleLanguage}
          className={classNames("", {}, [className])}
        >
          {t(short ? "short-lang-key" : "language")}
        </ButtonDepreacted>
      }
    />
  );
});
