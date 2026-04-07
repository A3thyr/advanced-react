import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import AboutIcon from "@/shared/assets/icons/about-20-20.svg";
import ArticleIcon from "@/shared/assets/icons/article-20-20.svg";
import MainIcon from "@/shared/assets/icons/main-20-20.svg";
import ProfileIcon from "@/shared/assets/icons/profile-20-20.svg";
import {
  AppRoutes,
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from "@/shared/const/router";
import { SidebarItemType } from "../types/sidebar";

export const getSideBarItems = createSelector(getUserAuthData, (userData) => {
  const SidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: MainIcon,
      text: "title",
      ns: AppRoutes.MAIN,
    },
    {
      path: getRouteAbout(),
      Icon: AboutIcon,
      text: "title",
      ns: AppRoutes.ABOUT,
    },

    // {
    //   path: RoutePath.articles_details,
    //   Icon: ProfileIcon,
    //   text: "title",
    //   ns: AppRoutes.ARTICLES_DETAILS,
    //   authOnly: true,
    // },
  ];

  if (userData) {
    SidebarItemsList.push({
      path: getRouteProfile(userData.id),
      Icon: ProfileIcon,
      text: "title",
      ns: AppRoutes.PROFILE,
      authOnly: true,
    });
    SidebarItemsList.push({
      path: getRouteArticles(),
      Icon: ArticleIcon,
      text: "title",
      ns: AppRoutes.ARTICLES,
      authOnly: true,
    });
  }
  return SidebarItemsList;
});
