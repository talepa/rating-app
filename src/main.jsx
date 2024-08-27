import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/UI/Header/Header.jsx";
import Body from "./components/UI/Body/Body.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import store from "./redux-store/store.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer />
      <StrictMode>
        <HelmetProvider>
          <Header />
          <Body>
            <App />
          </Body>
        </HelmetProvider>
      </StrictMode>
    </Provider>
  </BrowserRouter>
);
