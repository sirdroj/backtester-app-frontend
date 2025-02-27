import React, { useState } from "react";
import useStore from "../../stores/useStore";
import currentAP from "../../apiendpoint";

const samplewatchlist = [
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

const sampleStocks= [
  { ticker: "AAPL", name: "Apple Inc." },
  { ticker: "GOOGL", name: "Alphabet Inc." },
  { ticker: "MSFT", name: "Microsoft Corp." },
]

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

const WatchlistObject = ({
  watchlist,
  setSelectedWatchlists,
  selectedwatchlists,
  dir,
  deleteMode,
  editMode,
  fetchdetaillists
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(watchlist.name);
  const { token, fetchoptions } = useStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const[searchTerm, setSearchTerm] = useState("");
  const searchStocks = watchlist.data.filter((stock) => stock.Ticker.toLowerCase().includes(searchTerm.toLowerCase()) || stock.name.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleChange(e) {
    if (e.target.checked) {
      setSelectedWatchlists([...selectedwatchlists, watchlist.name]);
    } else {
      setSelectedWatchlists(
        selectedwatchlists.filter((name) => name !== watchlist.name)
      );
    }
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleInputChange(e) {
    setNewName(e.target.value);
  }

  async function updateWatchlistName(oldName, newName) {
    try {
      const response = await fetch(`${currentAP}/edit_file`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old_filename: oldName,
          new_filename: newName,
          token,
          directory_type: dir,
        }), // Token added to payload
      });

      if (!response.ok) throw new Error("Failed to update watchlist name");

      console.log("Watchlist name updated successfully");
      fetchoptions();
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  }

  function handleBlur() {
    setIsEditing(false);
    if (newName.trim() !== "" && newName !== watchlist.name) {
      updateWatchlistName(watchlist.name, newName);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleBlur();
    }
  }

  return (
    <div>
      <div className="p-1 bg-gray-700 m-1 rounded-md flex justify-between flex-1">
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="bg-gray-800 text-white px-1 rounded-sm outline-none"
          />
        ) : (
          <h1>{watchlist.name}</h1>
        )}
        <div className="cursor-pointer relative flex items-center">
          {deleteMode && (
            <input
              className="py-0 text-sm mx-2 text-slate-800 bg-gray-400 rounded-sm stroke-gray-300"
              type="checkbox"
              onChange={handleChange}
              checked={selectedwatchlists.includes(watchlist.name)}
            />
          )}
          {editMode && (
            <button onClick={handleEditClick} className="text-white ml-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.8787 3.70711C15.0503 2.53554 16.9497 2.53553 18.1213 3.70711L20.2929 5.87868C21.4645 7.05026 21.4645 8.94975 20.2929 10.1213L9.70711 20.7071C9.51957 20.8946 9.26522 21 9 21H4C3.44772 21 3 20.5523 3 20V15C3 14.7348 3.10536 14.4804 3.29289 14.2929L13.8787 3.70711ZM16.7071 5.12132C16.3166 4.7308 15.6834 4.7308 15.2929 5.12132L14.4142 6L18 9.58579L18.8787 8.70711C19.2692 8.31658 19.2692 7.68342 18.8787 7.2929L16.7071 5.12132ZM16.5858 11L13 7.41421L5 15.4142V19H8.58579L16.5858 11Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
          <div
            className={` transition-transform px-1 ${
              showDropdown ? "-rotate-90" : "rotate-90"
            } `}
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            {">"}
          </div>
        </div>
      </div>
      <div
        className={`dropdown  ${
          showDropdown ? "block" : "hidden"
      } bg-slate-600 m-2 rounded-md`}
      >
        <div>
        <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w- px-2 py-1 text-white bg-gray-700 border rounded-md border-gray-300 focus:outline-none mx-2 my-1"
            />
        </div>
        <div className="p-1 px-2">
          {searchStocks.map((stock) => (
            <div className="bg-gray-600 my-1 p-[2px] px-1">{stock.Ticker}-{stock.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchlistObject;
