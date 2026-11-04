import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";

import { getUserInited, initAuthData } from "@/entities/User";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Navbar } from "@/widgets/navbar";
import { PageLoader } from "@/widgets/PageLoader";
import { Sidebar } from "@/widgets/Sidebar";

import { AppLoaderLayout } from "@/shared/layouts/AppLoaderLayout";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { ToggleFeatures } from "@/shared/lib/features";
import { useAppToolbar } from "./lib/useAppToolbar";
import { AppRouter } from "./providers/router";
import { withTheme } from "./providers/theme-provider";

const App = () => {
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const userInited = useSelector(getUserInited);
  const toolbar = useAppToolbar();

  useEffect(() => {
    if (!userInited) {
      dispatch(initAuthData());
    }
  }, [dispatch, userInited]);

  if (!userInited) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <div id="app" className={classNames("app_redesigned", {}, [theme])}>
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    );
  }

  return (
    <div id="app" className={classNames("app_redesigned", {}, [theme])}>
      <Suspense fallback="">
        <MainLayout
          content={<AppRouter />}
          header={<Navbar />}
          sidebar={<Sidebar />}
          toolbar={toolbar}
        />
      </Suspense>
    </div>
  );
};

export default withTheme(App);
