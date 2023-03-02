import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import NavigationBar from "./navigation/NavigationBar";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NavigationBar />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
