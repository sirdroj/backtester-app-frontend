import React from "react";
import { Link } from "react-router-dom";

const ExploreLogs = () => {
  return (
    <div className="p-10">
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search "
            required
          />
        </div>{" "}
      </div>
      <div className="mt-10 border-gray-500  text-sm">
        <div className="flex items-center justify-between py-1 border-b-[1px]">
          <span className="flex items-center ">
            {" "}
            <svg width="8" height="8" className="mr-2">
              <circle cx="4" cy="4" r="4" fill="gray" />
            </svg>
            Explore Report 1
          </span>
          <span>28 Aug 2024</span>
          <span className="flex items-center w-[100px]">
            {" "}
            <svg width="12" height="12" className="mr-1">
              <circle
                cx="6"
                cy="6"
                r="5"
                fill="none"
                stroke="#56FF3B"
                stroke-width="2"
              />
            </svg>
            Sucess
          </span>
          <Link to={"/explore/explor_table"} className=" border-[1px] p-[1px] bg-[#] px-3 rounded-full border-purple-300 " >View Report</Link>
        </div>
        <div className="flex items-center justify-between py-1 my-4 border-b-[1px]">
          <span className="flex items-center ">
            {" "}
            <svg width="8" height="8" className="mr-2">
              <circle cx="4" cy="4" r="4" fill="gray" />
            </svg>
            Explore Report 1
          </span>
          <span>28 Aug 2024</span>
          <span className="flex items-center w-[100px]">
            {" "}
            <svg width="12" height="12" className="mr-1">
              <circle
                cx="6"
                cy="6"
                r="5"
                fill="none"
                stroke="#56FF3B"
                stroke-width="2"
              />
            </svg>
            Running
          </span>
          <button className="border-[1px] p-[1px] bg-[#] px-3 rounded-full border-purple-300 " >View Report</button>
        </div>
      </div>
    </div>
  );
};

export default ExploreLogs;
