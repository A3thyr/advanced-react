import { useTranslation } from "react-i18next";

import { CountrySelect } from "@/entities/Country";
import { CurrencySelect } from "@/entities/Currency";
import { Skeleton } from "@/shared/ui";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { ProfileCardProps } from "../ProfileCard/ProfileCard";

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation("profile");
  return (
    <HStack justfify="center" max>
      <Text
        title={t("profilecard.loading-error")}
        text={t("profilecard.reload-page")}
        variant={"error"}
        align={"center"}
      />
    </HStack>
  );
};

export const ProfileCardRedesignedSkeleton = () => {
  return (
    <Card padding={24} max>
      <VStack gap={32}>
        <HStack max justfify="center">
          <Skeleton border="100%" width={128} height={128} />
        </HStack>
        <HStack gap={32} max>
          <VStack gap={16} max>
            <Skeleton width={"100%"} height={38} />
            <Skeleton width={"100%"} height={38} />
            <Skeleton width={"100%"} height={38} />
            <Skeleton width={"100%"} height={38} />
          </VStack>
          <VStack gap={16} max>
            <Skeleton width={"100%"} height={38} />
            <Skeleton width={"100%"} height={38} />
            <Skeleton width={"100%"} height={38} />
            <Skeleton width={"100%"} height={38} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};

export const ProfileCardRedesigned = (props: ProfileCardProps) => {
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

  return (
    <Card padding={24} max className={className}>
      <VStack gap={32}>
        {data?.avatar && (
          <HStack max justfify="center">
            {<Avatar size={128} src={data?.avatar} alt="" />}
          </HStack>
        )}
        <HStack gap={24} max>
          <VStack gap={16} max>
            <Input
              data-testid="ProfileCard.first"
              value={data?.first}
              label={t("profilecard.firstName")}
              onChange={onChangeFirstname}
              readonly={isReadonly}
            />

            <Input
              data-testid="ProfileCard.lastname"
              value={data?.lastname}
              label={t("profilecard.secondName")}
              onChange={onChangeLastname}
              readonly={isReadonly}
            />

            <Input
              data-testid="ProfileCard.age"
              value={data?.age}
              label={t("profilecard.age")}
              onChange={onChangeAge}
              readonly={isReadonly}
            />

            <Input
              data-testid="ProfileCard.city"
              value={data?.city}
              label={t("profilecard.city")}
              onChange={onChangeCity}
              readonly={isReadonly}
            />
          </VStack>
          <VStack gap={16} max>
            <Input
              data-testid="ProfileCard.username"
              value={data?.username}
              label={t("profilecard.username")}
              onChange={onChangeUsername}
              readonly={isReadonly}
            />

            <Input
              value={data?.avatar}
              label={t("profilecard.avatar")}
              onChange={onChangeAvatar}
              readonly={isReadonly}
            />

            <CurrencySelect
              readonly={isReadonly}
              value={data?.currency}
              onChange={onChangeCurrency}
            />

            <CountrySelect
              readonly={isReadonly}
              value={data?.country}
              onChange={onChangeCountry}
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};
