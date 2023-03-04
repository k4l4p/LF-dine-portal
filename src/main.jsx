import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConnectRoot } from "./components/WalletConnection";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConnectRoot>
      <App />
    </ConnectRoot>
  </React.StrictMode>
);
