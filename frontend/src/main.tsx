import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToasterProvider } from "./components/ui/toaster";
import { LayoutProvider } from "./contexts/LayoutContext";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { queryClient } from "./services/api";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToasterProvider>
          <AuthProvider>
            <BrowserRouter>
              <LayoutProvider>
                <App />
              </LayoutProvider>
            </BrowserRouter>
          </AuthProvider>
        </ToasterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
