import { AppRouter } from "app/providers/router";
import { useTheme } from "app/providers/theme-provider";
import { Suspense } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Navbar } from "widgets/navbar";
import { Sidebar } from "widgets/Sidebar";
import "./styles/index.scss";

const App = () => {
  const { theme } = useTheme();

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
