import {
  getProfileData,
  getProfileReadOnly,
  profileActions,
  updateProfileData,
} from "entities/Profile";
import { getUserAuthData } from "entities/User";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, Text, ThemeButton } from "shared/ui";
import { HStack } from "shared/ui/Stack";

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({
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
            <Button theme={ThemeButton.OUTLINE} onClick={onEdit}>
              {t("profilecard.edit")}
            </Button>
          ) : (
            <HStack gap={8}>
              <Button theme={ThemeButton.OUTLINE_RED} onClick={onCancelEdit}>
                {t("profilecard.cancel")}
              </Button>
              <Button theme={ThemeButton.OUTLINE} onClick={onSave}>
                {t("profilecard.save")}
              </Button>
            </HStack>
          )}
        </div>
      )}
    </HStack>
  );
};
