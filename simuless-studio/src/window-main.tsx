import React from "react";
import ReactDOM from "react-dom/client";
import ScopeWindow from "./components/windows/scope-window";
import { applyTheme, getSystemTheme } from "@/lib/theme";
import "@/index.css";

// Initialize React root immediately
const rootElement = document.getElementById("window-root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

// Show loading state initially
root.render(
  <div className="w-full h-screen flex items-center justify-center bg-background">
    <div className="text-center text-foreground">
      <p className="mb-2">Loading Scope Window...</p>
    </div>
  </div>
);

console.log("[Window] Initialized, waiting for message...");

// Apply initial theme
const theme = localStorage.getItem("studio-store")
  ? JSON.parse(localStorage.getItem("studio-store") || "{}").state?.theme
  : getSystemTheme();
applyTheme(theme);

let windowConfig: any = null;
let windowData: any = null;

// Listen for initialization message from parent window
window.addEventListener("message", (event) => {
  console.log("[Window] Received message:", event.data.type, event.data);

  if (event.data.type === "WINDOW_INIT") {
    console.log("[Window] Initializing with config:", event.data.config);
    windowConfig = event.data.config;
    windowData = event.data.data;

    // Render the appropriate window content
    if (windowConfig.type === "scope") {
      console.log("[Window] Rendering Scope with data:", windowData);
      root.render(
        <React.StrictMode>
          <ScopeWindow
            title={windowConfig.title}
            initialDataX={windowData?.dataX}
            initialDataY={windowData?.dataY}
          />
        </React.StrictMode>
      );
    }
  }

  // Handle theme changes from parent
  if (event.data.type === "THEME_CHANGE") {
    applyTheme(event.data.theme);
  }

  // Handle simulation data updates
  if (event.data.type === "SIMULATION_DATA") {
    console.log("[Window] Received simulation data:", event.data.data);
    // This will be handled by ScopeWindow's message listener
  }
});

// Notify parent that window is ready
try {
  window.opener?.postMessage(
    {
      type: "WINDOW_READY",
      windowId: window.name,
    },
    "*"
  );
  console.log("[Window] Notified parent window");
} catch (e) {
  console.warn("Could not notify parent window", e);
}
