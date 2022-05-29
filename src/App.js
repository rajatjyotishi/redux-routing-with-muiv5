import React, { Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux";
import Root from "./components/Root";
import CatchAllErrors from "./components/CatchAllError";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme } from "@mui/material/styles";

import CircleProgress from "@mui/material/CircularProgress";
import { merge } from "lodash";
import { customTheme } from "./theme";

export const store = configureStore();
const theme = createTheme(adaptV4Theme(merge({}, customTheme)));
const persistor = persistStore(store);

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<CircleProgress />}>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <HashRouter basename="/">
                <CatchAllErrors>
                  <Root />
                </CatchAllErrors>
              </HashRouter>
            </PersistGate>
          </ReduxProvider>
        </Suspense>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
