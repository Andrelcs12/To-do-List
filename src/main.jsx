import React from "react";
import ReactDOM from "react-dom/client";         // Corrigido para acessar a pasta "main/wcm"
import App from "./main/App.jsx";       // Corrigido para acessar a pasta "main"
import "./main/App.css";                // Corrigido para acessar a pasta "main"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


