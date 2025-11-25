import {
  getProfileReadOnly,
  profileActions,
  updateProfileData,
} from "entities/Profile";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, Text, ThemeButton } from "shared/ui";
import cls from "./ProfilePageHeader.module.scss";

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation("profile");

  const readonly = useSelector(getProfileReadOnly);
  const dispatch = useAppDispatch();

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
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t("profilecard.title")} />
      {readonly ? (
        <Button
          theme={ThemeButton.OUTLINE}
          className={cls.editBtn}
          onClick={onEdit}
        >
          {t("profilecard.edit")}
        </Button>
      ) : (
        <>
          <Button
            theme={ThemeButton.OUTLINE_RED}
            className={cls.editBtn}
            onClick={onCancelEdit}
          >
            {t("profilecard.cancel")}
          </Button>
          <Button
            theme={ThemeButton.OUTLINE}
            className={cls.saveBtn}
            onClick={onSave}
          >
            {t("profilecard.save")}
          </Button>
        </>
      )}
    </div>
  );
};
