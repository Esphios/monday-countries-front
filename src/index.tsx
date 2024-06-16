import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  throw new Error("Root element with id 'root' not found in the document.");
}

serviceWorker.unregister();
