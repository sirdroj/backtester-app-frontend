import React, { useState } from "react";
import WatchlistObject from "./WatchlistObject";
import AddWatchlist from "../../pages/AddWatchlist";
import useStore from "../../stores/useStore";
import currentAP from "../../apiendpoint";
const samplePortfolio = [
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
const ManagePortfolios = ({
  sentibytes,
  showmanagePortfolio,
  setshowmanagePortfolio,
}) => {
  const [pg, setpg] = useState(0);
  const { set_showAddPortfolioPopup, userPortfolios, token, fetchoptions } =
    useStore();
  const [selectedPortfolios, setSelectedPortfolios] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

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

  function handleDelete() {
    fetch(`${currentAP}/delete_options`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        portfolios: selectedPortfolios,
        token: token, // Token is now included in the payload
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete portfolios");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Delete response:", data);
        alert("Portfolios deleted successfully!");
        setSelectedPortfolios([]);
        fetchoptions();
        setDeleteMode(false);
      })
      .catch((error) => {
        console.error("Error deleting portfolios:", error);
        alert("Failed to delete portfolios. Please try again."); // Error message
      });
  }

  return (
    <div>
      <div className="relative   h-full sentibytes-container">
        <div>
          <h1 className="text-center border-b-[1px] mb-2 py-1 flex justify-between px-2">
            <div></div>
            <span>ManagePortfolios</span>
            <div className=" cursor-pointer relative">
              <span onClick={() => setShowOptions(!showOptions)}>
                {threedots}
              </span>
              {showOptions && (
                <ul className="absolute bg-gray-500 z-10 rounded-md right-[0%] p-1 space-y-1 text-[10px] w-max text-left">
                  <li
                    className={`${
                      selectedPortfolios.length != 1 ? "opacity-50" : ""
                    } hover:bg-slate-600 p-[2px] rounded-sm px-1`}
                  >
                    Set as Current Portfolio
                  </li>
                  {deleteMode && (
                    <li
                      onClick={() => {
                        // if(selectedPortfolios.length>0){
                        handleDelete();
                        setShowOptions(!showOptions); // }
                      }}
                      className={` hover:bg-slate-600 p-[2px] rounded-sm px-1`}
                    >
                      Delete{" "}
                    </li>
                  )}
                  {!deleteMode && (
                    <li
                      onClick={() => {
                        setDeleteMode(true);
                        setShowOptions(!showOptions);
                      }}
                      className={` hover:bg-slate-600 p-[2px] rounded-sm px-1`}
                    >
                      Select
                    </li>
                  )}
                  <li
                    onClick={() => {
                      setEditMode(!editMode);
                      setShowOptions(!showOptions);
                    }}
                    className={` hover:bg-slate-600 p-[2px] rounded-sm px-1`}
                  >
                    {editMode ? "Exit Edit Mode" : "Edit mode"}
                  </li>

                  {/* <li onClick={()=>setShowOptions(false)}>close</li> */}
                </ul>
              )}
            </div>
          </h1>
        </div>
        {pg == 0 && (
          <body>
            {userPortfolios.map((item, idx) => (
              <WatchlistObject
                watchlist={item}
                key={idx}
                setSelectedWatchlists={setSelectedPortfolios}
                selectedwatchlists={selectedPortfolios}
                dir={"portfolio"}
                deleteMode={deleteMode}
                editMode={editMode}
              />
            ))}
          </body>
        )}
        {pg == 1 && (
          <body>
            <AddPortfolio />
          </body>
        )}
      </div>
      <div className="  bottom-0">
        <button
          onClick={() => {
            pg == 1 ? setpg(0) : setshowmanagePortfolio(false);
          }}
          className="p-1 bg-gray-700 rounded-xl bg-opacity-50 border-[1px] px-3 m-2 text-sm"
        >
          back
        </button>
        {pg !== 1 && (
          <button
            // onClick={() => setpg(1)}
            onClick={() => set_showAddPortfolioPopup(true)}
            className="p-1 bg-gray-700 rounded-xl bg-opacity-50 border-[1px] px-3 m-2 text-sm"
          >
            Add Portfolio
          </button>
        )}
      </div>
    </div>
  );
};

export default ManagePortfolios;
