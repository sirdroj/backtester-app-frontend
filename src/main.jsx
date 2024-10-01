import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserGuide from "./pages/UserGuide.jsx";
import Home from "./pages/Home.jsx";
import Backtest from "./pages/Backtest.jsx";
import UserGuideBeta from "./pages/UserGuideBeta.jsx";
import Explore from "./pages/Explore.jsx";
import ExploreTable from "./pages/explore/ExploreTable.jsx";
import Explore_home from "./pages/explore/Explore_home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "backtest-guide",
        element: <UserGuide />,
      },
      {
        path: "backtest",
        element: <Backtest />,
      },
      {
        path: "backtest-guide-beta",
        element: <UserGuideBeta />,
      },
      {
        path: "explore",
        children: [
          {
            path: "",
            element: <Explore_home />,
          },
          {
            path: "explor_table",
            element: <ExploreTable />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <AppRouter /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
