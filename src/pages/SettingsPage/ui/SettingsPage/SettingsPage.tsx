import { useTranslation } from "react-i18next";

import { Text } from "@/shared/ui/redesigned/Text/Text";
import { PageLayout } from "@/widgets";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { UiDesignSwitcher } from "@/features/uiDesignSwitcher";

interface SettingsPageProps {
  className?: string;
}

const SettingsPage = ({ className }: SettingsPageProps) => {
  const { t } = useTranslation("main");

  return (
    <PageLayout className={className}>
      <VStack gap={16}>
        <Text title={t("user-settings")} />
        <UiDesignSwitcher />
      </VStack>
    </PageLayout>
  );
};

export default SettingsPage;
