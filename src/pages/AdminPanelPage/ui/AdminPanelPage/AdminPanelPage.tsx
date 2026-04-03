import { useTranslation } from "react-i18next";
import { PageLayout } from "@/widgets";

const AdminPanelPage = () => {
  const { t } = useTranslation("translation");
  return <PageLayout>{t("admin")}</PageLayout>;
};

export default AdminPanelPage;
