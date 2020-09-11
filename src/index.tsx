import "normalize.css/normalize.css";
import "./submodules/xwing-miniatures-font/dist/xwing-miniatures.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
