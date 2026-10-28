import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getUserAuthData } from "@/entities/User";
import { getFeatureFlags, updateFeatureFlags } from "@/shared/lib/features";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ListBox } from "@/shared/ui/redesigned/Popups";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Skeleton } from "@/shared/ui";

interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher = ({ className }: UiDesignSwitcherProps) => {
  const { t } = useTranslation("translation");
  const isAppRedesigned = getFeatureFlags("isAppRedesigned");
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const items = [
    {
      content: t("new-design"),
      value: "new",
    },
    {
      content: t("old-design"),
      value: "old",
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);
      await dispatch(
        updateFeatureFlags({
          userId: authData.id,
          newFeatures: {
            isAppRedesigned: value === "new",
          },
        }),
      ).unwrap();
      setIsLoading(true);
    }
  };

  return (
    <HStack align="center" gap={8}>
      <Text text={t("ui-variant")} />
      {isLoading ? (
        <Skeleton width={160} height={40} />
      ) : (
        <ListBox
          direction="bottom right"
          items={items}
          onChange={onChange}
          value={isAppRedesigned ? "new" : "old"}
          className={className}
        />
      )}
    </HStack>
  );
};
