import { FunctionComponent, SVGAttributes } from "react";
import AboutIcon from "shared/assets/icons/about-20-20.svg";
import MainIcon from "shared/assets/icons/main-20-20.svg";
import ProfileIcon from "shared/assets/icons/profile-20-20.svg";
import { AppRoutes, RoutePath } from "shared/config/router/router.config";

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: FunctionComponent<SVGAttributes<SVGElement>>;
  ns?: string; // декларировать более подробный и точный тип
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    Icon: MainIcon,
    text: "title",
    ns: AppRoutes.MAIN,
  },
  {
    path: RoutePath.about,
    Icon: AboutIcon,
    text: "title",
    ns: AppRoutes.ABOUT,
  },
  {
    path: RoutePath.profile,
    Icon: ProfileIcon,
    text: "title",
    ns: AppRoutes.PROFILE,
  },
];
