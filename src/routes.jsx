import { createBrowserRouter } from "react-router-dom";
import UserGuide from "./pages/UserGuide.jsx";
import Home from "./pages/Home.jsx";
import Backtest from "./pages/Backtest.jsx";
import UserGuideBeta from "./pages/UserGuideBeta.jsx";
// import Explore from "./pages/Explore.jsx";
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
import Login2 from "./pages/Login2.jsx";
import ActiveUsers from "./Admin/ActiveUsers.jsx";
import PendingApprovals from "./Admin/PendingApprovals.jsx";
import News from "./pages/News/News.jsx";
import AllNews from "./pages/News/AllNews.jsx";
import AddWatchlist from "./pages/AddWatchlist.jsx";
import AddPortfolio from "./pages/AddPortfolio.jsx";
import Explore_home_responsive from "./pages/explore/Explore_home_responsive.jsx";

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
        path: "add_watchlist",
        element: <AddWatchlist />,
      },
      {
        path: "add_portfolio",
        element: <AddPortfolio />,
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
        path: "explorer",
        children: [
          {
            path: "",
            // element: <Explore_home />,
            element: <Explore_home_responsive />,
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
    path: "news",
    element: <News />,
    children: [
      {
        path: "",
        element: <AllNews />,
      },
    ]
  },
  {
    path: "Login",
    // element: <Login />,
    element: <Login2 />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "Admin",
    children: [
      {
        path: "",
        element: <AdminPanel />,
        children:
        [
          {
            path: "",
            element: <ActiveUsers />,
          },
          {
            path: "ActiveUsers",
            element: <ActiveUsers />,
          },
          {
            path: "pendingSignups",
            element: <PendingApprovals />,
          },
        ]
      },
      {
        path: "Login",
        element: <AdminLogin />,
      },
    ]
  },
  // {
  //   path: "AdminLogin",
  //   element: <AdminLogin />,
  // },
]);
