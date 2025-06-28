import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToasterProvider } from "./components/ui/toaster";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider";
import { queryClient } from "./services/api";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToasterProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ToasterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
