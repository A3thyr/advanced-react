import { AppRouter } from "app/providers/router";
import { useTheme } from "app/providers/theme-provider";
import { userActions } from "entities/User";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Navbar } from "widgets/navbar";
import { Sidebar } from "widgets/Sidebar";

const App = () => {
  const { theme } = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

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
