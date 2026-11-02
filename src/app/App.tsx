import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";

import { getUserInited, initAuthData } from "@/entities/User";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Navbar } from "@/widgets/navbar";
import { PageLoader } from "@/widgets/PageLoader";
import { Sidebar } from "@/widgets/Sidebar";

import { MainLayout } from "@/shared/layouts/MainLayout";
import { AppRouter } from "./providers/router";
import { ToggleFeatures } from "@/shared/lib/features";
import { AppLoaderLayout } from "@/shared/layouts/AppLoaderLayout";

const App = () => {
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const userInited = useSelector(getUserInited);

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
          toolbar={<div />}
        />
      </Suspense>
    </div>
  );
};

export default App;
