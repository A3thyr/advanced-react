import { AppRouter } from "app/providers/router";
import { useTheme } from "app/providers/theme-provider";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Navbar } from "widgets/navbar";
import "./styles/index.scss";

const App = () => {
  const { theme } = useTheme();
  return (
    <div className={classNames("app", {}, [theme])}>
      <Navbar />
      <AppRouter />
    </div>
  );
};

export default App;
