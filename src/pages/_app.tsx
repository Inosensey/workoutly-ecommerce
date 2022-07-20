import "../../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { configureStore } from "@reduxjs/toolkit";
import type { AppProps } from "next/app";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "../Redux/Storage";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import persistedReducers from "../Redux/Reducers/reducers";
import Layout from "../modules/Layout/Layout";

const persistConfig = {
  key: "root",
  version: 1,
  blacklist: ["loginFormReducer", "LoadingPopUpReducer"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, persistedReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
