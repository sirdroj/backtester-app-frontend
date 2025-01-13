import React from "react";
import useStore from "../stores/useStore";
import './sentibytes.css'; // Import the CSS file
import "./scrollbar.css";

const GlobalNews = () => {
  const { news, newsloading, newserror } = useStore();

  return (
    <div>
      <div className="overflow-y-auto h-[380px]">
        {/* Loading State */}
        {newsloading && <p>Loading news...</p>}

        {/* Error State */}
        {newserror && (
          <div className="text-red-500">
            <p>Error: Unable to load news. Please try again later.</p>
          </div>
        )}

        {/* News List */}
        {!newsloading && !newserror && news && news.length > 0 ? (
          <ul>
            {news.map((item) => {
              if (!item.heading || !item.content) return null; // Skip invalid entries
              return (
                <li
                  key={item.id || item.heading}
                  className="mx-1 bg-white bg-opacity-5 p-1 rounded-lg my-1"
                >
                  <a target="_blank" rel="noopener noreferrer" href={item.link}>
                    <h1 className="text-[14px]">{item.heading}</h1>
                    <p className="text-[12px] opacity-70">
                      {item.content.slice(0, 140)} ....
                    </p>
                    <div className="flex justify-between text-[10px]">
                      <p className="opacity-50">
                        by {item.author || "Unknown"} on {item.source || "Unknown"}
                      </p>
                      <p className="opacity-50">
                        {item.date ? item.date.slice(0, 16) : "N/A"}
                      </p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          // Empty State
          !newsloading &&
          !newserror && (
            <div className="text-center opacity-70">
              <p>No news available at the moment.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default GlobalNews;

