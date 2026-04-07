import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "@/entities/User";
import { getRouteAdminPanel, getRouteProfile } from "@/shared/const/router";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Avatar, Dropdown } from "@/shared/ui";
import cls from "./AvatarDropdown.module.scss";

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown: FC<AvatarDropdownProps> = ({ className }) => {
  const { t } = useTranslation("translation");
  const dispatch = useAppDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const authData = useSelector(getUserAuthData);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) {
    return null;
  }

  return (
    <Dropdown
      direction="bottom left"
      trigger={<Avatar size={30} src={authData.avatar} />}
      className={classNames(cls.AvatarDropdown, {}, [className])}
      items={[
        ...(isAdminPanelAvailable
          ? [
              {
                content: t("admin"),
                href: getRouteAdminPanel(),
              },
            ]
          : []),
        {
          content: t("profile"),
          href: getRouteProfile(authData.id),
        },
        {
          content: t("logout"),
          onClick: onLogout,
        },
      ]}
    />
  );
};
