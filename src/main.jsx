import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserGuide from './pages/UserGuide.jsx';
import Home from './pages/Home.jsx';
import Backtest from './pages/Backtest.jsx';
import UserGuideBeta from './pages/UserGuideBeta.jsx';
import Backtest2 from './pages/Backtest2.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element:<Home />,
      },
      {
        path: "backtest-guide",
        element:<UserGuide />,
      },
      {
        path: "backtest",
        element:<Backtest />,
      },
      {
        path: "backtest2",
        element:<Backtest2 />,
      },
      {
        path: "backtest-guide-beta",
        element:<UserGuideBeta />,
      },

    ],
  },
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <AppRouter /> */}
    <RouterProvider router={router} />

  </StrictMode>,
)
