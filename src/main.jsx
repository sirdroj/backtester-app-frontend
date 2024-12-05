import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { router } from "./routes.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <AppRouter /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
