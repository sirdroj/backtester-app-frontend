import React, { useState } from "react";
import WatchlistObject from "./WatchlistObject";
import AddWatchlist from "../../pages/AddWatchlist";
import useStore from "../../stores/useStore";
import currentAP from "../../apiendpoint";

const ManageWatchlists = ({
  sentibytes,
  showmanageWatchlist,
  setshowmanageWatchlist,
}) => {
  const [pg, setpg] = useState(0);
  const { set_showAddwatchlistPopup, userWatchlists, token, fetchoptions,fetchdetaillists,detailedWatchlist } = useStore();
  const [selectedWatchlists, setSelectedWatchlists] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  console.log({ detailedWatchlist})
  const[searchTerm, setSearchTerm] = useState("");
  const searchWatchlist = detailedWatchlist.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  
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
        watchlists: selectedWatchlists,
        token: token,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete watchlists");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Delete response:", data);
        alert("Watchlists deleted successfully!");
        fetchoptions();
        setSelectedWatchlists([]);
        setDeleteMode(false);
      })
      .catch((error) => {
        console.error("Error deleting watchlists:", error);
        alert("Failed to delete watchlists. Please try again.");
      });
  }

  return (
    <div>
      <div className="relative h-full sentibytes-container">
        <div>
          <h1 className="items-center text-center border-b-[1px] mb-2 py-1 flex justify-between px-2">
            <span>Manage Watchlists</span>
            <div><input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w- px-2 py-0 text-xsm text-white bg-gray-700 border rounded-md border-gray-300 focus:outline-none mx-2 my-1"
            /></div>
            <div className="cursor-pointer relative ">
              <span onClick={() => setShowOptions(!showOptions)}>
                {threedots}
              </span>
              {showOptions && (
                <ul className="absolute bg-gray-500 z-10 rounded-md right-[0%] p-1 space-y-1 text-[10px] w-max text-left">
                  <li className={`${selectedWatchlists.length !== 1 ? "opacity-50" : ""} hover:bg-slate-600 p-[2px] rounded-sm px-1`}>
                    Set as Current Watchlist
                  </li>
                  {deleteMode && (
                    <li
                      onClick={() => {
                        handleDelete();
                        setShowOptions(!showOptions);
                      }}
                      className="hover:bg-slate-600 p-[2px] rounded-sm px-1"
                    >
                      Delete
                    </li>
                  )}
                  {!deleteMode && (
                    <li
                      onClick={() => {
                        setDeleteMode(true);
                        setShowOptions(!showOptions);
                      }}
                      className="hover:bg-slate-600 p-[2px] rounded-sm px-1"
                    >
                      Select 
                    </li>
                  )}
                  <li
                    onClick={() => {
                      setEditMode(!editMode);
                      setShowOptions(!showOptions);
                    }}
                    className="hover:bg-slate-600 p-[2px] rounded-sm px-1"
                  >
                    {editMode ? "Exit Edit Mode" : "Edit Mode"}
                  </li>
                </ul>
              )}
            </div>
          </h1>
        </div>

        {pg === 0 && (
          <div>
            {searchWatchlist.map((item, idx) => (
            // {userWatchlists.map((item, idx) => (
              <WatchlistObject
                watchlist={item}
                key={item}
                setSelectedWatchlists={setSelectedWatchlists}
                selectedwatchlists={selectedWatchlists}
                dir={"watchlist"}
                deleteMode={deleteMode}
                editMode={editMode}
              />
            ))}
          </div>
        )}
        {pg === 1 && (
          <div>
            <AddWatchlist />
          </div>
        )}
      </div>

      <div className="bottom-0">
        <button
          onClick={() => {
            pg === 1 ? setpg(0) : setshowmanageWatchlist(false);
          }}
          className="p-1 bg-gray-700 rounded-xl bg-opacity-50 border-[1px] px-3 m-2 text-sm"
        >
          Back
        </button>
        {pg !== 1 && (
          <button
            onClick={() => set_showAddwatchlistPopup(true)}
            className="p-1 bg-gray-700 rounded-xl bg-opacity-50 border-[1px] px-3 m-2 text-sm"
          >
            Add Watchlist
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageWatchlists;
