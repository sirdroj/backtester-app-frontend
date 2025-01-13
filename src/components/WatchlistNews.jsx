import React, { useEffect, useState } from "react";
import useStore from "../stores/useStore";
import currentAPI from "../apiendpoint";
import AddWatchlist from "../pages/AddWatchlist";
import WatchlistNewsPopup from "./popups/WatchlistNewsPopup";

const WatchlistNews = () => {
  const { watchlist_news, watchlistNewsLoading, watchlistNewsError, watchlist, setshowWatchlistnewsPopup } = useStore();
  const [showpopup, setShowPopup] = useState(false);

  return (
    <div>
      {watchlist.length > 0 && (
        <div className="overflow-y-auto h-[380px]">
          {/* Conditional rendering for different states */}
          {watchlistNewsLoading && <p>Loading news...</p>}
          {watchlistNewsError && (
            <p className="text-red-500">Error: {watchlistNewsError}</p>
          )}

          {!watchlistNewsLoading &&
            !watchlistNewsError &&
            watchlist_news.length === 0 && (
              <p>No news available for your watchlist.</p>
            )}

          {!watchlistNewsLoading &&
            !watchlistNewsError &&
            watchlist_news.length > 0 && (
              <ul>
                {watchlist_news
                  .sort((a, b) => a.date - b.date)
                  .slice(0)
                  .map((item) =>
                    item.heading ? (
                      <li
                        key={item.id || item.heading}
                        className="mx-1 bg-white bg-opacity-5 p-1 rounded-lg my-1"
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={item.link}
                        >
                          <h1 className="text-[14px] font-bold">{item.heading}</h1>
                          <p className="text-[12px] opacity-70">
                            {item.content.slice(0, 140)}
                          </p>
                          <div className="flex justify-between text-[10px] text-gray-500">
                            <p>
                              by {item.author} on {item.source}
                            </p>
                            <p>{item.date.slice(0, 16)}</p>
                          </div>
                        </a>
                      </li>
                    ) : null
                  )}
              </ul>
            )}
          <div>
            <button onClick={() => setshowWatchlistnewsPopup(true)}>
              View More
            </button>
          </div>
        </div>
      )}

      {!watchlist.length && <AddWatchlist />}
    </div>
  );
};

export default WatchlistNews;
