import { CountrySelect } from "entities/Country";
import { Country } from "entities/Country/model/types/country";
import { CurrencySelect } from "entities/Currency";
import { Currency } from "entities/Currency/model/types/currency";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  classNames,
  Mods,
} from "shared/lib/helpers/classNames/classNames.helper";
import { Avatar, Input, Text, TextTheme } from "shared/ui";
import { TextAlign } from "shared/ui/Text/Text";
import { PageLoader } from "widgets/PageLoader";
import { Profile } from "../../model/types/profile";
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
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency?: Currency) => void;
  onChangeCountry?: (country?: Country) => void;
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
  onChangeAvatar,
  onChangeUsername,
  onChangeCurrency,
  onChangeCountry,
  isReadonly,
}) => {
  const { t } = useTranslation("profile");

  const mods: Mods = {
    [cls.editing]: !isReadonly,
  };

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
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      {/* <ProfilePageHeader /> */}
      <div className={cls.data}>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            {<Avatar src={data?.avatar} alt="" />}
          </div>
        )}
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

        <Input
          value={data?.username}
          placeholder={t("profilecard.username")}
          className={cls.input}
          onChange={onChangeUsername}
          readonly={isReadonly}
        />

        <Input
          value={data?.avatar}
          placeholder={t("profilecard.avatar")}
          className={cls.input}
          onChange={onChangeAvatar}
          readonly={isReadonly}
        />

        <CurrencySelect
          className={cls.input}
          readonly={isReadonly}
          value={data?.currency}
          onChange={onChangeCurrency}
        />

        <CountrySelect
          className={cls.input}
          readonly={isReadonly}
          value={data?.country}
          onChange={onChangeCountry}
        />
      </div>
    </div>
  );
};
