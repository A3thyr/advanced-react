import { memo } from "react";
import { useTranslation } from "react-i18next";
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
    <Button variant="clear" onClick={toggleLanguage}>
      {t(short ? "short-lang-key" : "language")}
    </Button>
  );
});
