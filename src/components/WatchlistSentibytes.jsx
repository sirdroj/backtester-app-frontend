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
    return (
      <div className="w-full  justify-center h-full">
        {showaddwatchlist && (
          <AddWatchlist
            showaddwatchlist={showaddwatchlist}
            setshowaddwatchlist={setshowaddwatchlist}
          />
        )}
        {!showaddwatchlist && (
          <div className="flex justify-center items-center h-[300px] ">
            <div>
              <div className="w-full p-2 text-center">
                You dont have a Watchlist
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setshowaddwatchlist(true)}
                  className="p-1 bg-gray-700 rounded-xl bg-opacity-50 border-[1px] px-3 m-2 text-sm"
                >
                  Add Watchlist
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
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
