import { useTranslation } from "react-i18next";
import { ProfileCardProps } from "../ProfileCard/ProfileCard";
import cls from "./ProfileCardDeprecated.module.scss";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input/Input";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar/Avatar";
import {
  classNames,
  Mods,
} from "@/shared/lib/helpers/classNames/classNames.helper";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { CurrencySelect } from "@/entities/Currency";
import { CountrySelect } from "@/entities/Country";
import { Spinner, Text, TextAlign, TextTheme } from "@/shared/ui";

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation("profile");
  return (
    <HStack
      justfify="center"
      max
      className={classNames(cls.ProfileCard, {}, [cls.error])}
    >
      <Text
        title={t("profilecard.loading-error")}
        text={t("profilecard.reload-page")}
        theme={TextTheme.ERROR}
        align={TextAlign.CENTER}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedSkeleton = () => {
  return (
    <HStack
      justfify="center"
      max
      className={classNames(cls.ProfileCard, { [cls.loading]: true }, [])}
    >
      <Spinner />
    </HStack>
  );
};

export const ProfileCardDeprecated = (props: ProfileCardProps) => {
  const {
    className,
    data,

    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCurrency,
    onChangeCountry,
    isReadonly,
  } = props;
  const { t } = useTranslation("profile");

  const mods: Mods = {
    [cls.editing]: !isReadonly,
  };

  return (
    <VStack
      gap={16}
      max
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {/* <ProfilePageHeader /> */}
      {data?.avatar && (
        <HStack max justfify="center">
          {<AvatarDeprecated src={data?.avatar} alt="" />}
        </HStack>
      )}
      <InputDeprecated
        data-testid="ProfileCard.first"
        value={data?.first}
        placeholder={t("profilecard.firstName")}
        className={cls.input}
        onChange={onChangeFirstname}
        readonly={isReadonly}
      />

      <InputDeprecated
        data-testid="ProfileCard.lastname"
        value={data?.lastname}
        placeholder={t("profilecard.secondName")}
        className={cls.input}
        onChange={onChangeLastname}
        readonly={isReadonly}
      />

      <InputDeprecated
        data-testid="ProfileCard.age"
        value={data?.age}
        placeholder={t("profilecard.age")}
        className={cls.input}
        onChange={onChangeAge}
        readonly={isReadonly}
      />

      <InputDeprecated
        data-testid="ProfileCard.city"
        value={data?.city}
        placeholder={t("profilecard.city")}
        className={cls.input}
        onChange={onChangeCity}
        readonly={isReadonly}
      />

      <InputDeprecated
        data-testid="ProfileCard.username"
        value={data?.username}
        placeholder={t("profilecard.username")}
        className={cls.input}
        onChange={onChangeUsername}
        readonly={isReadonly}
      />

      <InputDeprecated
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
    </VStack>
  );
};
