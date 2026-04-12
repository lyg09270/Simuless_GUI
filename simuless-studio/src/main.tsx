import React from "react"
import ReactDOM from "react-dom/client"

import { AppProviders } from "@/app/providers/AppProviders"
import App from "./App"
import "./App.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
)
