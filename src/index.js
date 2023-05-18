import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from "./App";
import { FavoritesContextProvider } from "./store/favourites-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="338831568014-ke7l996l0tqb1gavvh61k1oa9heqnana.apps.googleusercontent.com">
  <FavoritesContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </FavoritesContextProvider>
  </GoogleOAuthProvider>

);
