import { Link } from "react-router-dom";

import { useTheme } from "app/providers/theme-provider";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { AppRouter } from "app/providers/router";
import "./styles/index.scss";
import { Navbar } from "widgets/navbar";

const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={classNames("app", {}, [theme])}>
      <Navbar />
      <button onClick={toggleTheme}>Swtich Theme</button>

      <AppRouter />
    </div>
  );
};

export default App;
