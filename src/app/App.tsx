import { useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { getUserInited, userActions } from "@/entities/User";
import { classNames } from "@/shared/lib/helpers/classNames/classNames.helper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Navbar } from "@/widgets/navbar";
import { PageLoader } from "@/widgets/PageLoader";
import { Sidebar } from "@/widgets/Sidebar";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { AppRouter } from "./providers/router";

const App = () => {
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const userInited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  if (!userInited) return <PageLoader />;

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        <Navbar />

        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
