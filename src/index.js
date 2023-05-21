import React from "react";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HashRouter as Router} from 'react-router-dom'

import App from "./App";
import { ImportantContextProvider } from "./store/important-context";
import "./index.css"


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="338831568014-ke7l996l0tqb1gavvh61k1oa9heqnana.apps.googleusercontent.com">
  <ImportantContextProvider>
  <Router>
    <App />
  </Router>
  </ImportantContextProvider>
  </GoogleOAuthProvider>

);
