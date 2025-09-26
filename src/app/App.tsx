import { Link } from "react-router-dom";

import { useTheme } from "app/providers/theme-provider";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { AppRouter } from "app/providers/router";
import "./styles/index.scss";

const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={classNames("app", {}, [theme])}>
      <Link to={`/`} style={{ backgroundColor: "violet" }}>
        Main Page
      </Link>
      <Link to={`/about`} style={{ backgroundColor: "red" }}>
        About Page
      </Link>
      <button onClick={toggleTheme}>Swtich Theme</button>
      <AppRouter />
    </div>
  );
};

export default App;
