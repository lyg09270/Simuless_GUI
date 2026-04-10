import React from "react";
import ReactDOM from "react-dom/client";
import ScopeWindow from "./components/windows/scope-window";
import { applyTheme } from "@/lib/theme";
import "@/index.css";

// Initialize theme from parent window
window.addEventListener("message", (event) => {
  if (event.data.type === "WINDOW_INIT") {
    const { config, data } = event.data;

    // Apply theme from parent
    const theme = localStorage.getItem("studio-store")
      ? JSON.parse(localStorage.getItem("studio-store") || "{}").state?.theme
      : "light";
    applyTheme(theme);

    // Listen for theme changes from parent
    window.addEventListener("message", (e) => {
      if (e.data.type === "THEME_CHANGE") {
        applyTheme(e.data.theme);
      }
    });

    // Render window content based on type
    const root = ReactDOM.createRoot(document.getElementById("window-root")!);

    if (config.type === "scope") {
      root.render(
        <React.StrictMode>
          <ScopeWindow
            title={config.title}
            initialDataX={data?.dataX}
            initialDataY={data?.dataY}
          />
        </React.StrictMode>
      );
    }
  }
});
