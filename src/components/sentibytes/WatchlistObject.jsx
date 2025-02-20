import React, { useState } from "react";

const threedots = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4"
  >
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

const WatchlistObject = ({ watchlist,setSelectedWatchlists}) => {
  const [showOptions, setShowOptions] = useState(false);
  function handleChange(e) {
    // if (e.target.checked) {
    //   // Add to selectedWatchlists if checked
    //   setSelectedWatchlists((prevwatchlist) => [...prevwatchlist, watchlist.name]);
    // } else {
    //   // Remove from selectedWatchlists if unchecked
    //   setSelectedWatchlists((prevwatchlist) =>
    //     prevwatchlist.filter(name => name !== watchlist.name)
    //   );    }
  }
  return (
    <div className=" p-1 bg-gray-700 m-1 rounded-md flex justify-between flex-1">
      <h1>{watchlist.name}</h1>{" "}
      <div className=" cursor-pointer relative">
        <input
          className="w-4 h-4 mx-2 text-slate-800 bg-gray-400 rounded-sm stroke-gray-300"
          type="checkbox"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default WatchlistObject;
