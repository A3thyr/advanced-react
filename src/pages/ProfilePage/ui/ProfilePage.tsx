import { EditableProfileCard } from "features/editableProfileCard";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Text } from "shared/ui";
import { VStack } from "shared/ui/Stack";
import { PageLayout } from "widgets";

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { t } = useTranslation("profile");
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Text text={t("no-data")} />;
  }

  return (
    <PageLayout className={classNames("", {}, [className])}>
      <VStack max gap={16}>
        {/* <ProfilePageHeader /> */}
        <EditableProfileCard id={id} />
      </VStack>
    </PageLayout>
  );
};

export default ProfilePage;
