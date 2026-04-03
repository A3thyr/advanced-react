import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "@/app/providers/error";
import { StoreProvider } from "@/app/providers/StoreProvider";
import { ThemeProvider } from "@/app/providers/theme-provider";

import "./app/styles/index.scss";

import App from "./app/App";

import "@/shared/config/i18n/i18n";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container is not found. Can't complete the App mount");
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
);
