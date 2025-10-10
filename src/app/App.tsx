import { AppRouter } from "app/providers/router";
import { useTheme } from "app/providers/theme-provider";
import { Suspense, useState } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames.helper";
import { Modal } from "shared/ui";
import { Navbar } from "widgets/navbar";
import { Sidebar } from "widgets/Sidebar";
import "./styles/index.scss";

const App = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
          voluptatem suscipit dicta quos vel, doloribus eveniet quaerat sequi at
          eius numquam labore! Modi laborum animi cum cupiditate officiis
          maiores repellat?
        </Modal>
        <button onClick={() => setIsOpen(true)}>toggle modal</button>
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
