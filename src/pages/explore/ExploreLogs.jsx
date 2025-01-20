import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores/useStore";

const ExploreLogs = () => {
  const { explore_response, explore_response_loading, explore_response_error, current_response_name, set_current_response_name } =
    useStore();
  const navigate = useNavigate();
  const isDataValid = Array.isArray(explore_response) && explore_response.length > 0;

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-10 relative">
      <h1>Explore Logs</h1>
      <div className="border-b-[1px] border-gray-500 py-2">
        <div className="relative w-[250px]">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>{" "}
      </div>
      {(isDataValid || explore_response_error || explore_response_loading) && (
        <div className="mt-10 border-gray-500 text-sm">
          <div className="flex items-center justify-between py-1 border-b-[1px]">
            <span
              className="flex items-center relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={current_response_name}
                  onChange={(e) => set_current_response_name(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="text-sm border bg-slate-800 bg-opacity-10 outline-none rounded px-2 py-1"
                />
              ) : (
                <>
                  <svg width="8" height="8" className="mr-2">
                    <circle cx="4" cy="4" r="4" fill="gray" />
                  </svg>
                  {current_response_name}
                </>
              )}
              <div
                className={`absolute right-[-16px] transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <svg
                  onClick={() => setIsEditing(true)}
                  className="cursor-pointer w-[15px]"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.8787 3.70711C15.0503 2.53554 16.9497 2.53553 18.1213 3.70711L20.2929 5.87868C21.4645 7.05026 21.4645 8.94975 20.2929 10.1213L9.70711 20.7071C9.51957 20.8946 9.26522 21 9 21H4C3.44772 21 3 20.5523 3 20V15C3 14.7348 3.10536 14.4804 3.29289 14.2929L13.8787 3.70711ZM16.7071 5.12132C16.3166 4.7308 15.6834 4.7308 15.2929 5.12132L14.4142 6L18 9.58579L18.8787 8.70711C19.2692 8.31658 19.2692 7.68342 18.8787 7.2929L16.7071 5.12132ZM16.5858 11L13 7.41421L5 15.4142V19H8.58579L16.5858 11Z"
                    fill="white"
                  />
                </svg>
              </div>
            </span>
            <span>{currentDate}</span>
            <span className="flex items-center w-[300px]">
              {" "}
              <svg width="12" height="12" className="mr-1">
                <circle
                  cx="6"
                  cy="6"
                  r="5"
                  fill="none"
                  stroke={
                    explore_response_loading
                      ? "orange"
                      : explore_response_error
                      ? "red"
                      : "#56FF3B"
                  }
                  strokeWidth="2"
                />
              </svg>
              <div>
                {explore_response_loading
                  ? "Running..."
                  : explore_response_error
                  ? explore_response_error
                  : "Success"}
              </div>
            </span>
            <button
              disabled={explore_response_error || explore_response_loading}
              onClick={() => navigate("../explor_table")}
              className="disabled:opacity-30 border-[1px] p-[1px] bg-[#] px-3 rounded-full border-purple-300"
            >
              View Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreLogs;
