import { BugButton } from "app/providers/error";
import { Counter } from "entities/Counter";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const { t } = useTranslation("main");
  return (
    <div>
      {t("title")}
      <BugButton />
      <Counter />
    </div>
  );
};

export default MainPage;
