import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./App.css";
import { NavbarTop } from "./components/NavbarTop";
import useStore from "./stores/useStore";
import ChatBot from "./pages/ChatBot";
import currentAPI from "./apiendpoint";





function App() {
  const [count, setCount] = useState(0);
  const { fetchindexTrend,theme,fetchPortfolioSentibytes, toggleTheme,username,token,fetchnewsData,fetchWatchlistNews,watchlist,setWatchlistNews,setWatchlistNewsLoading,setWatchlistNewsError,fetchSentibytes } = useStore();
  const location = useLocation(); // Get the current route
  
  const getWatchlistNews = async (token,setWatchlistNews,setWatchlistNewsLoading,setWatchlistNewsError) => {
    const url = `${currentAPI}/get_watchlist_news/`;
    // const url = `${currentAPI}/get_sentibytes/`;
    const payload = {
      token,
      // watchlist: watchlist.map((obj) => obj.Ticker),
    };
  
    try {
      setWatchlistNewsLoading(true); // Start loading
      setWatchlistNewsError(null); // Clear any previous errors
  
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      setWatchlistNews(data.watchlistNews); // Update news state
    } catch (error) {
      console.error("Error fetching watchlist news:", error);
      setWatchlistNewsError(error.message); // Set error state
    } finally {
      setWatchlistNewsLoading(false); // Stop loading
    }
  };
  
  useEffect(() => {
    fetchnewsData();

  }, [fetchnewsData]);
  
  useEffect(() => {
    fetchindexTrend();

  }, [fetchindexTrend]);
  
  useEffect(() => {
    fetchSentibytes();

  }, [fetchSentibytes]);

  useEffect(() => {
    fetchPortfolioSentibytes();

  }, [fetchPortfolioSentibytes]);
  
  useEffect(() => {
      getWatchlistNews(token,setWatchlistNews,setWatchlistNewsLoading,setWatchlistNewsError);
    }, []);


  function checkLogin() {

    if ( (!localStorage.getItem("access_token") || !localStorage.getItem("username"))) {
      window.location.href = "/login"; 
    }
  }

  checkLogin();

  return (
    <div
      className={` ${theme} `}
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`w-screen min-h-screen bg-gradient-to-r from-[#3E2539] to-[#101F29] dark:bg-gradient-to-r dark:from-[#121124] dark:to-[#0b191e] overflow-hidden text-white bg-opacity-20`}
      >
        <NavbarTop />

        {/* Conditionally render ChatBot if the current path is not '/chat_ai' */}
        {location.pathname !== "/Chat_AI" && <ChatBot />}

        <div className="mt-10 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
