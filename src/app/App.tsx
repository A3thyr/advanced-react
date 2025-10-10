import { AppRouter } from "app/providers/router";
import { useTheme } from "app/providers/theme-provider";
import { Suspense, useState } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Modal } from "shared/ui";
import { Navbar } from "widgets/navbar";
import { Sidebar } from "widgets/Sidebar";

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
