import { useTranslation } from "react-i18next";
import { PageLayout } from "@/widgets";

const ForbiddenPage = () => {
  const { t } = useTranslation("translation");
  return (
    <PageLayout data-testid="ForbiddenPage">{t("forbidden-page")}</PageLayout>
  );
};

export default ForbiddenPage;
