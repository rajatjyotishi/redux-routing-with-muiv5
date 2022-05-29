import {
  configureStore as configureToolkitStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import reduxPromiseMiddleware from "redux-promise-middleware";
import rootReducer from "./reducers";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      /* redux toolkit recommends that you only return a payload in an action
			 that is a constant, so we need to ignore these actions to prevent the warnings. */
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  reduxPromiseMiddleware,
];

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["persisted"],
  stateReconciler: autoMergeLevel1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// use redux dev tools in development
/* eslint-disable no-process-env, no-underscore-dangle */
const useReduxDevTools = Boolean(
  process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
);
/* eslint-enable no-process-env, no-underscore-dangle */

// hydrate initial state, this might be loaded via local storage or caching
export function configureStore(initialState = {}) {
  return configureToolkitStore({
    reducer: persistedReducer,
    devTools: useReduxDevTools,
    middleware,
    preloadedState: initialState,
  });
}

export default configureStore;
