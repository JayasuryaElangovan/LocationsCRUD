import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import TableContextProvider from "./pages/TableContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const root = ReactDOM.createRoot(document.getElementById("root"));
export const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TableContextProvider>
        <ToastContainer autoClose={2000} />
        <App />
      </TableContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
