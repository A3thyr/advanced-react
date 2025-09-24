import { Link, Route, Routes } from "react-router-dom";
import "./index.scss";
import { AboutPageLazy } from "./pages/AboutPage/about.lazy";
import { MainPageLazy } from "./pages/MainPage/main.lazy";
import { Suspense } from "react";

const App = () => {
  return (
    <div className="">
      <Link to={`/`} style={{ backgroundColor: "violet" }}>
        Main Page
      </Link>
      <Link to={`/about`} style={{ backgroundColor: "red" }}>
        About Page
      </Link>
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
