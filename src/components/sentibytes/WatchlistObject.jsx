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

const WatchlistObject = ({ watchlist }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className=" p-1 bg-gray-600 m-1 rounded-md flex justify-between flex-1">
      <h1>{watchlist.name}</h1>{" "}
      <div className=" cursor-pointer relative">
        <span onClick={()=>setShowOptions(!showOptions)}>{threedots}</span>
        {showOptions &&
          <ul className="absolute bg-gray-500 z-10 rounded-md right-[0%] p-1 space-y-1 text-[10px] w-max">

            <li className="hover:bg-slate-600 p-[2px] rounded-sm px-1">Set as Current Watchlist</li>
            <li className="hover:bg-slate-600 p-[2px] rounded-sm px-1">Delete </li>
            {/* <li onClick={()=>setShowOptions(false)}>close</li> */}
          </ul>
        }
      </div>
    </div>
  );
};

export default WatchlistObject;
