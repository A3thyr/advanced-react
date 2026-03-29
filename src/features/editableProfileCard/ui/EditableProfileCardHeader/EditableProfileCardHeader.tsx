import { getUserAuthData } from "entities/User";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, Text, ThemeButton } from "shared/ui";
import { HStack } from "shared/ui/Stack";
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
    <HStack max justfify="between" className={classNames("", {}, [className])}>
      <Text title={t("profilecard.title")} />
      {canEdit && (
        <div>
          {readonly ? (
            <Button
              data-testid="EditableProfileCardHeader.EditBtn"
              theme={ThemeButton.OUTLINE}
              onClick={onEdit}
            >
              {t("profilecard.edit")}
            </Button>
          ) : (
            <HStack gap={8}>
              <Button
                data-testid="EditableProfileCardHeader.CancelBtn"
                theme={ThemeButton.OUTLINE_RED}
                onClick={onCancelEdit}
              >
                {t("profilecard.cancel")}
              </Button>
              <Button
                data-testid="EditableProfileCardHeader.SaveBtn"
                theme={ThemeButton.OUTLINE}
                onClick={onSave}
              >
                {t("profilecard.save")}
              </Button>
            </HStack>
          )}
        </div>
      )}
    </HStack>
  );
};
