import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";

import AboutIconDeprecated from "@/shared/assets/icons/about-20-20.svg";
import ArticleIconDeprecated from "@/shared/assets/icons/article-20-20.svg";
import MainIconDeprecated from "@/shared/assets/icons/main-20-20.svg";
import ProfileIconDeprecated from "@/shared/assets/icons/profile-20-20.svg";

import MainIcon from "@/shared/assets/icons/home.svg";
import AboutIcon from "@/shared/assets/icons/Info.svg";
import ArticleIcon from "@/shared/assets/icons/article.svg";
import ProfileIcon from "@/shared/assets/icons/avatar.svg";

import {
  AppRoutes,
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from "@/shared/const/router";
import { SidebarItemType } from "../types/sidebar";
import { toggleFeatures } from "@/shared/lib/features";

export const getSideBarItems = createSelector(getUserAuthData, (userData) => {
  const SidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: toggleFeatures({
        name: "isAppRedesigned",
        on: () => MainIcon,
        off: () => MainIconDeprecated,
      }),
      text: "title",
      ns: AppRoutes.MAIN,
    },
    {
      path: getRouteAbout(),
      Icon: toggleFeatures({
        name: "isAppRedesigned",
        on: () => AboutIcon,
        off: () => AboutIconDeprecated,
      }),
      text: "title",
      ns: AppRoutes.ABOUT,
    },
  ];

  if (userData) {
    SidebarItemsList.push({
      path: getRouteProfile(userData.id),
      Icon: toggleFeatures({
        name: "isAppRedesigned",
        on: () => ProfileIcon,
        off: () => ProfileIconDeprecated,
      }),
      text: "title",
      ns: AppRoutes.PROFILE,
      authOnly: true,
    });
    SidebarItemsList.push({
      path: getRouteArticles(),
      Icon: toggleFeatures({
        name: "isAppRedesigned",
        on: () => ArticleIcon,
        off: () => ArticleIconDeprecated,
      }),
      text: "title",
      ns: AppRoutes.ARTICLES,
      authOnly: true,
    });
  }
  return SidebarItemsList;
});
