import React, { useState } from "react";
import SentibyteObject from "../SentibyteObject";
import WatchlistObject from "./WatchlistObject";
import AddWatchlist from "../../pages/AddWatchlist";
import useStore from "../../stores/useStore";
const sampleWatchlist = [
  {
    name: "Tech Giants",
    stocks: [
      { ticker: "AAPL", name: "Apple Inc." },
      { ticker: "GOOGL", name: "Alphabet Inc." },
      { ticker: "MSFT", name: "Microsoft Corp." },
    ],
  },
  {
    name: "Tech Giants",
    stocks: [
      { ticker: "AAPL", name: "Apple Inc." },
      { ticker: "GOOGL", name: "Alphabet Inc." },
      { ticker: "MSFT", name: "Microsoft Corp." },
    ],
  },
  {
    name: "Tech Giants",
    stocks: [
      { ticker: "AAPL", name: "Apple Inc." },
      { ticker: "GOOGL", name: "Alphabet Inc." },
      { ticker: "MSFT", name: "Microsoft Corp." },
    ],
  },
  {
    name: "Tech Giants",
    stocks: [
      { ticker: "AAPL", name: "Apple Inc." },
      { ticker: "GOOGL", name: "Alphabet Inc." },
      { ticker: "MSFT", name: "Microsoft Corp." },
    ],
  },
  {
    name: "Tech Giants",
    stocks: [
      { ticker: "AAPL", name: "Apple Inc." },
      { ticker: "GOOGL", name: "Alphabet Inc." },
      { ticker: "MSFT", name: "Microsoft Corp." },
    ],
  },
  {
    name: "Tech Giants",
    stocks: [
      { ticker: "AAPL", name: "Apple Inc." },
      { ticker: "GOOGL", name: "Alphabet Inc." },
      { ticker: "MSFT", name: "Microsoft Corp." },
    ],
  },
  {
    name: "Tech Giants",
    stocks: [
      { ticker: "AAPL", name: "Apple Inc." },
      { ticker: "GOOGL", name: "Alphabet Inc." },
      { ticker: "MSFT", name: "Microsoft Corp." },
    ],
  },
  {
    name: "Indian Blue Chips",
    stocks: [
      { ticker: "RELIANCE", name: "Reliance Industries Ltd" },
      { ticker: "TCS", name: "Tata Consultancy Services Ltd" },
      { ticker: "INFY", name: "Infosys Ltd" },
    ],
  },
  {
    name: "EV & Auto",
    stocks: [
      { ticker: "TSLA", name: "Tesla Inc." },
      { ticker: "TATAMOTORS", name: "Tata Motors Ltd" },
      { ticker: "NIO", name: "Nio Inc." },
    ],
  },
  {
    name: "Banking Sector",
    stocks: [
      { ticker: "HDFCBANK", name: "HDFC Bank Ltd" },
      { ticker: "ICICIBANK", name: "ICICI Bank Ltd" },
      { ticker: "JPM", name: "JPMorgan Chase & Co." },
    ],
  },
  {
    name: "Healthcare & Pharma",
    stocks: [
      { ticker: "PFE", name: "Pfizer Inc." },
      { ticker: "SUNPHARMA", name: "Sun Pharmaceutical Industries Ltd" },
      { ticker: "ABBV", name: "AbbVie Inc." },
    ],
  },
];
const ManageWatchlists = ({
  sentibytes,
  showmanageWatchlist,
  setshowmanageWatchlist,
}) => {
  const [pg, setpg] = useState(0);
  const{set_showAddwatchlistPopup}=useStore()
  return (
    <div>
      <div className="relative   h-full sentibytes-container">
        <h1 className="text-center border-b-[1px] mb-2 py-1">ManageWatchlists</h1>
        {pg == 0 && (
          <body>
            {sampleWatchlist.map((item, idx) => (
              <WatchlistObject watchlist={item} key={idx} />
            ))}
          </body>
        )}
        {pg == 1 && (
          <body>
            <AddWatchlist />
          </body>
        )}
        
      </div>
      <div className="  bottom-0">
          <button
            onClick={() => {pg==1?setpg(0):setshowmanageWatchlist(false)}}
            className="p-1 bg-gray-700 rounded-xl bg-opacity-50 border-[1px] px-3 m-2 text-sm"
          >
            back
          </button>
          {pg!==1 && <button
            // onClick={() => setpg(1)}
            onClick={() => set_showAddwatchlistPopup(true)}
            className="p-1 bg-gray-700 rounded-xl bg-opacity-50 border-[1px] px-3 m-2 text-sm"
          >
            Add Watchlist
          </button>}
        </div>
    </div>
  );
};

export default ManageWatchlists;
