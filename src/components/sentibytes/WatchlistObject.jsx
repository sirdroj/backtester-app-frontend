import React, { useState } from "react";
import useStore from "../../stores/useStore";
import currentAP from "../../apiendpoint";

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
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(watchlist);
  const { token, fetchoptions } = useStore();

  function handleChange(e) {
    if (e.target.checked) {
      setSelectedWatchlists([...selectedwatchlists, watchlist]);
    } else {
      setSelectedWatchlists(
        selectedwatchlists.filter((name) => name !== watchlist)
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
    if (newName.trim() !== "" && newName !== watchlist) {
      updateWatchlistName(watchlist, newName);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleBlur();
    }
  }

  return (
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
        <h1>{watchlist}</h1>
      )}
      <div className="cursor-pointer relative flex items-center">
        {deleteMode && (
          <input
            className="py-0 text-sm mx-2 text-slate-800 bg-gray-400 rounded-sm stroke-gray-300"
            type="checkbox"
            onChange={handleChange}
            checked={selectedwatchlists.includes(watchlist)}
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
      </div>
    </div>
  );
};

export default WatchlistObject;
