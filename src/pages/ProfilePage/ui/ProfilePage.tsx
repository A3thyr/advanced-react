import { FC } from "react";
import { useParams } from "react-router-dom";
import { EditableProfileCard } from "@/features/editableProfileCard";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { PageLayout } from "@/widgets";

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <PageLayout
      data-testid="ProfilePage"
      className={classNames("", {}, [className])}
    >
      <VStack max gap={16}>
        <EditableProfileCard id={id} />
      </VStack>
    </PageLayout>
  );
};

export default ProfilePage;
