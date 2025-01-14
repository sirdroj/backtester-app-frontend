import React, { useState } from "react";
import useStore from "../stores/useStore";
import SentibyteObject from "./SentibyteObject";
import "./sentibytes.css"; // Import the CSS file
import AddWatchlist from "../pages/AddWatchlist";

const WatchlistSentibytes = () => {
  const [showaddwatchlist, setshowaddwatchlist] = useState(false);
  const { sentibytes, sentibytesloading, sentibyteserror } = useStore();

  if (sentibytesloading) {
    return <div>Loading...</div>;
  }

  if (sentibyteserror) {
    return <div>Error: {sentibyteserror}</div>;
  }

  if (!sentibytes || sentibytes.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="">
      {!showaddwatchlist && (
        <div>
        <div className="h-full sentibytes-container">
          <div className="pt-1">
            <ul>
              {sentibytes.map((data) => (
                <SentibyteObject key={data.id} data={data} />
              ))}
            </ul>
          </div>
          
        </div>
        <div>
          <button
            onClick={() => setshowaddwatchlist(true)}
            className="p-1 bg-gray-700 rounded-xl bg-opacity-50 border-[1px] px-3 m-2 text-sm"
          >
            Add Watchlist
          </button>
        </div>
        </div>
      )}
      
      {showaddwatchlist && (
        <AddWatchlist
          showaddwatchlist={showaddwatchlist}
          setshowaddwatchlist={setshowaddwatchlist}
        />
      )}
      
    </div>
  );
};

export default WatchlistSentibytes;
