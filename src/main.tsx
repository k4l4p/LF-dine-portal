import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConnectRoot } from "./components/WalletConnection";
import { SettingsProvider } from "./contexts/Settings"
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
  <React.StrictMode>
    <SettingsProvider>
    <ConnectRoot>
      <App />
    </ConnectRoot>
    </SettingsProvider>
  </React.StrictMode>
);
