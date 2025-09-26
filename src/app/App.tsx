import { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";

import "./styles/index.scss";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { useTheme } from "app/providers/theme-provider";
import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";

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
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path={`/about`} element={<AboutPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
