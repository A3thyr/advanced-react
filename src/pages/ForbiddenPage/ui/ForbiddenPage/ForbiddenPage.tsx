import { useTranslation } from "react-i18next";
import { PageLayout } from "widgets";

const ForbiddenPage = () => {
  const { t } = useTranslation("translation");
  return <PageLayout>{t("forbidden-page")}</PageLayout>;
};

export default ForbiddenPage;
