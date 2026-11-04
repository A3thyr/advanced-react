import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button } from "@/shared/ui";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { getProfileReadOnly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { profileActions } from "../../model/slice/profileSlice";

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader: FC<EditableProfileCardHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation("profile");

  const readonly = useSelector(getProfileReadOnly);
  const dispatch = useAppDispatch();

  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  return (
    <Card border="partial" padding={24} max>
      <HStack
        align="center"
        max
        justfify="between"
        className={classNames("", {}, [className])}
      >
        <Text title={t("profilecard.title")} />
        {canEdit && (
          <div>
            {readonly ? (
              <Button
                data-testid="EditableProfileCardHeader.EditBtn"
                variant="outline"
                onClick={onEdit}
              >
                {t("profilecard.edit")}
              </Button>
            ) : (
              <HStack gap={8}>
                <Button
                  data-testid="EditableProfileCardHeader.CancelBtn"
                  variant="outline"
                  color="error"
                  onClick={onCancelEdit}
                >
                  {t("profilecard.cancel")}
                </Button>
                <Button
                  data-testid="EditableProfileCardHeader.SaveBtn"
                  variant="outline"
                  onClick={onSave}
                  color="success"
                >
                  {t("profilecard.save")}
                </Button>
              </HStack>
            )}
          </div>
        )}
      </HStack>
    </Card>
  );
};
