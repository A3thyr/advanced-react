import React from "react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "widgets";

const AboutPage = () => {
  const { t } = useTranslation("about");
  return <PageLayout>{t("about")}</PageLayout>;
};

export default AboutPage;
