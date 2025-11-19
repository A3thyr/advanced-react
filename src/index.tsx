import { ErrorBoundary } from "app/providers/error";
import { ThemeProvider } from "app/providers/theme-provider";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "app/providers/StoreProvider";

import "./app/styles/index.scss";

import App from "./app/App";

import "shared/config/i18n/i18n";

render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
