import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./App.css";
import { NavbarTop } from "./components/NavbarTop";
import useStore from "./stores/useStore";
import ChatBot from "./pages/ChatBot";
import currentAPI from "./apiendpoint";
import AddwatchlistPopup from "./components/AddwatchlistPopup";
import AddPortfolioPopup from "./components/AddPortfolioPopup";

function App() {
  const [rotation, setRotation] = useState(0); // State to track rotation degree
  const {
    fetchindexTrend,
    theme,
    fetchPortfolioSentibytes,
    toggleTheme,
    username,
    token,
    fetchnewsData,
    fetchWatchlistNews,
    watchlist,
    setWatchlistNews,
    setWatchlistNewsLoading,
    setWatchlistNewsError,
    fetchSentibytes,
    userWAtchlist,
    fetchoptions

  } = useStore();
  const location = useLocation(); // Get the current route

  const getWatchlistNews = async (
    token,
    setWatchlistNews,
    setWatchlistNewsLoading,
    setWatchlistNewsError
  ) => {
    const url = `${currentAPI}/get_watchlist_news/`;
    const payload = { token };

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
    console.log("calling fetchoptions")
    fetchoptions();
  }, []);

  useEffect(() => {
    fetchPortfolioSentibytes();
  }, [fetchPortfolioSentibytes]);

  useEffect(() => {
    getWatchlistNews(
      token,
      setWatchlistNews,
      setWatchlistNewsLoading,
      setWatchlistNewsError
    );
  }, []);

  // Continuous rotation logic
  useEffect(() => {
    const rotate = () => {
      setRotation((prev) => (prev + 1) % 360); // Increment rotation by 1 degree
    };
    const intervalId = setInterval(rotate, 70); // Rotate every 30ms (adjust for speed)

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  function checkLogin() {
    if (
      !localStorage.getItem("access_token") ||
      !localStorage.getItem("username")
    ) {
      window.location.href = "/login";
    }
  }

  checkLogin();

  return (
    <div className={` ${theme} `}>
      <div
        className={` w-screen min-h-screen bg-gradient-to-r from-[#587D9A] via-[#2D384A] to-[#22252E] dark:bg-gradient-to-r dark:from-[#121124] dark:to-[#0b191e] overflow-hidden text-white bg-opacity-20`}
      >
        <NavbarTop />
        <AddwatchlistPopup />
        <AddPortfolioPopup />
        <div className="absolute   overflow-hidden w-full h-screen">
          <img
            id="vector1"
            src="./bgsvgs/Vector (2).svg"
            style={{ transform: `rotate(${rotation}deg)` }} // Apply rotation
            className="absolute bottom-[-20%] -left-[15%] w-[500px]"
          />
        </div>
        {/* Conditionally render ChatBot if the current path is not '/chat_ai' */}
        {/* {location.pathname !== "/Chat_AI" && <ChatBot />} */}

        <div className="  mt-10 overflow-hidden z-[100]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
