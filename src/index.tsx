import React from "react";
import { StrictMode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import store from "./redux";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Fallback from "./components/ui/Fallback";
import { AuthProvider, LanguageProvider, ThemeContextProvider } from "./contexts";
import translations from "./translations";
import "./index.css"

const Root = () => {
  return (
    <StrictMode>
      <LanguageProvider>
        <AuthProvider>
        <IntlProvider locale="en" messages={translations.en as any}>
          <ErrorBoundary FallbackComponent={Fallback}>
            <Provider store={store}>
              <ThemeContextProvider>
                <CssBaseline />
                <App />
              </ThemeContextProvider>
            </Provider>
          </ErrorBoundary>
        </IntlProvider>
        </AuthProvider>
      </LanguageProvider>
    </StrictMode>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement as any).render(<Root />);

reportWebVitals();
