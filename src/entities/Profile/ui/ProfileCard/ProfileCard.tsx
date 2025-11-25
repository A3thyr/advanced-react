import { Profile } from "entities/Profile/model/types/profile";
import { ProfilePageHeader } from "pages/ProfilePage";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Input, Text, TextTheme } from "shared/ui";
import { TextAlign } from "shared/ui/Text/Text";
import { PageLoader } from "widgets/PageLoader";
import cls from "./ProfileCard.module.scss";

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  isReadonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
}

export const ProfileCard: FC<ProfileCardProps> = ({
  className,
  data,
  error,
  isLoading,
  onChangeFirstname,
  onChangeLastname,
  onChangeAge,
  onChangeCity,
  isReadonly,
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
      <ProfilePageHeader />
      <div className={cls.data}>
        <Input
          value={data?.first}
          placeholder={t("profilecard.firstName")}
          className={cls.input}
          onChange={onChangeFirstname}
          readonly={isReadonly}
        />

        <Input
          value={data?.lastname}
          placeholder={t("profilecard.secondName")}
          className={cls.input}
          onChange={onChangeLastname}
          readonly={isReadonly}
        />

        <Input
          value={data?.age}
          placeholder={t("profilecard.age")}
          className={cls.input}
          onChange={onChangeAge}
          readonly={isReadonly}
        />

        <Input
          value={data?.city}
          placeholder={t("profilecard.city")}
          className={cls.input}
          onChange={onChangeCity}
          readonly={isReadonly}
        />
      </div>
    </div>
  );
};
