import { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AboutPageLazy } from "./pages/AboutPage/about.lazy";
import { MainPageLazy } from "./pages/MainPage/main.lazy";
import "./styles/index.scss";
import { useTheme } from "./theme/useTheme";
import { classNames } from "./helpers/classNames";

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
          <Route path="/" element={<MainPageLazy />} />
          <Route path={`/about`} element={<AboutPageLazy />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
