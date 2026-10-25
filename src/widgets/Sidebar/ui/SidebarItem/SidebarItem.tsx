import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getUserAuthData } from "@/entities/User";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { AppLink, Icon } from "@/shared/ui";
// import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon/Icon";
import {
  AppLink as AppLinkDeprecated,
  AppLinkTheme,
} from "@/shared/ui/deprecated/AppLink/AppLink";
import { SidebarItemType } from "../../model/types/sidebar";
import cls from "./SidebarItem.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink
      to={item.path}
      className={classNames(cls.itemRedesigned, {
        [cls.collapsedRedesigned]: collapsed,
      })}
      activeClassName={cls.active}
    >
      <Icon Svg={item.Icon} />
      <span className={cls.link}>{t(item.text, { ns: item.ns })}</span>
    </AppLink>
  );
});
