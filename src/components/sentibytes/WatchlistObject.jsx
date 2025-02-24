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
  dir
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(watchlist);
  const { token,fetchoptions } = useStore();

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
        body: JSON.stringify({ old_filename:oldName, new_filename:newName, token,directory_type:dir }), // Token added to payload
      });

      if (!response.ok) throw new Error("Failed to update watchlist name");

      console.log("Watchlist name updated successfully");
      fetchoptions()
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
        <h1>{newName}</h1>
      )}
      <div className="cursor-pointer relative flex items-center">
        <input
          className="w-4 h-4 mx-2 text-slate-800 bg-gray-400 rounded-sm stroke-gray-300"
          type="checkbox"
          onChange={handleChange}
          checked={selectedwatchlists.includes(watchlist)}
        />
        <button onClick={handleEditClick} className="text-white ml-2">
          ✏️
        </button>
      </div>
    </div>
  );
};

export default WatchlistObject;
