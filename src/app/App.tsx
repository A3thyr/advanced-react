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

const App = () => {
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const userInited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!userInited) return <PageLoader />;

  return (
    <div className={classNames("app_redesigned", {}, [theme])}>
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
