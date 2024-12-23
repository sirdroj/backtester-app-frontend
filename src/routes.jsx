import { createBrowserRouter } from "react-router-dom";
import UserGuide from "./pages/UserGuide.jsx";
import Home from "./pages/Home.jsx";
import Backtest from "./pages/Backtest.jsx";
import UserGuideBeta from "./pages/UserGuideBeta.jsx";
import Explore from "./pages/Explore.jsx";
import ExploreTable from "./pages/explore/ExploreTable.jsx";
import Explore_home from "./pages/explore/Explore_home.jsx";
import App from "./App.jsx";
import ExploreLogs from "./pages/explore/ExploreLogs.jsx";
import Backtestlogs from "./pages/Backtest/Backtestlogs.jsx";
import Settings from "./pages/Settings.jsx";
import ExploreAnalytics from "./pages/explore/ExploreAnalytics.jsx";
import BacktestAnalatics from "./pages/Backtest/BacktestAnalatics.jsx";
import ChatWindow from "./pages/ChatWindow.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";
import AdminPanel from "./Admin/AdminPanel.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
     
      {
        path: "chat_AI",
        element: <ChatWindow />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "backtest-guide",
        element: <UserGuide />,
      },
      {
        path: "backtest",
        children: [
          {
            path: "",
            element: <Backtest />,
          },
          {
            path: "logs",
            element: <Backtestlogs />,
          },
          {
            path: "analytics/:id",
            element: <BacktestAnalatics />,
          },
        ],
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
            children:[
              {
                path:"popup",
                element:<ExploreAnalytics />
              }
            ]
          },
          {
            path: "Logs",
            element: <ExploreLogs />,
            
          },
        ],
      },
    ],
    
  },
  {
    path: "Login",
    element: <Login />,
  },
  // {
  //   path: "signup",
  //   element: <Signup />,
  // },
  // {
  //   path: "AdminPanel",
  //   element: <AdminPanel />,
  // },
  // {
  //   path: "AdminLogin",
  //   element: <AdminLogin />,
  // },
]);
