import { Profile } from "entities/Profile/model/types/profile";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Button, Input, Text, TextTheme, ThemeButton } from "shared/ui";
import { TextAlign } from "shared/ui/Text/Text";
import { PageLoader } from "widgets/PageLoader";
import cls from "./ProfileCard.module.scss";

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
}

export const ProfileCard: FC<ProfileCardProps> = ({
  className,
  data,
  error,
  isLoading,
}) => {
  const { t } = useTranslation("profile");

  if (isLoading) {
    return (
      <div
        className={classNames(cls.ProfileCard, { [cls.loading]: true }, [
          className,
        ])}
      >
        <PageLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          title={t("profilecard.loading-error")}
          text={t("profilecard.reload-page")}
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t("profilecard.title")} />
        <Button theme={ThemeButton.OUTLINE} className={cls.editBtn}>
          {t("profilecard.edit")}
        </Button>
      </div>
      <div className={cls.data}>
        <Input
          value={data?.first}
          placeholder={t("profilecard.firstName")}
          className={cls.input}
        />
        <Input
          value={data?.lastname}
          placeholder={t("profilecard.secondName")}
          className={cls.input}
        />
      </div>
    </div>
  );
};
