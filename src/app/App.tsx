import { AppRouter } from "app/providers/router";
import { useTheme } from "app/providers/theme-provider";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Navbar } from "widgets/navbar";
import "./styles/index.scss";
import { Sidebar } from "widgets/Sidebar";

const App = () => {
  const { theme } = useTheme();
  return (
    <div className={classNames("app", {}, [theme])}>
      <Navbar />
      <div className="content-page">
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
