import "../../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import type { AppProps } from "next/app";
import { store } from "../Redux/store";
import { Provider } from "react-redux";
import Layout from "../modules/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
