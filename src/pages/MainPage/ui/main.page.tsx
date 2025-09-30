import { BugButton } from "app/providers/error";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const { t } = useTranslation("main");
  return (
    <div>
      {t("title")}
      <BugButton />
    </div>
  );
};

export default MainPage;
