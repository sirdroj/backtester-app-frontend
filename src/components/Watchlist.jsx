import React, { useState, useEffect } from "react";
import currentAPI from "../apiendpoint";
import useStore from "../stores/useStore";

const Watchlist = () => {
  const {watchlist, setWatchlist} = useStore();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token"); // Use the real token from your auth process

    if (!token) {
      setError("Access token is missing. Please log in.");
      setLoading(false);
      return;
    }

    const fetchWatchlist = async () => {
      try {
        const response = await fetch(`${currentAPI}/get_watchlistCSV/?token=${encodeURIComponent(token)}`);
        // const response = await fetch(`${currentAPI}/get_watchlist/?token=${encodeURIComponent(token)}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setWatchlist(data.watchlist);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-[20px] w-full text-center mt-0">Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>No items in the watchlist</p>
      ) : (
        <ul className="mt-2s">
          {watchlist.map((item, index) => (
            <li key={index} className="p-2 border-b">
              {item.Name} 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Watchlist;
