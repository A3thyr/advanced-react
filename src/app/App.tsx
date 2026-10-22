import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserInited, initAuthData } from "@/entities/User";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Navbar } from "@/widgets/navbar";
import { PageLoader } from "@/widgets/PageLoader";
import { Sidebar } from "@/widgets/Sidebar";

import { AppRouter } from "./providers/router";
import { ToggleFeatures } from "@/shared/lib/features";

const App = () => {
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const userInited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!userInited) return <PageLoader />;

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <div className={classNames("app", {}, [theme])}>
          <Suspense fallback="">
            <Navbar />
            <div className="content-page">
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
      on={
        <div className={classNames("app_redesigned", {}, [theme])}>
          <Sidebar />
          <AppRouter />
        </div>
      }
    />
  );
};

export default App;
