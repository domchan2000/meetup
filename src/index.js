import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import App from "./App";
import { FavoritesContextProvider } from "./store/favourites-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FavoritesContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </FavoritesContextProvider>
);
