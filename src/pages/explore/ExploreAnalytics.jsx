import React from "react";
import PriceChart from "./PriceChart";
import { Navigator } from "../../assets/utils/Navigator";

const ExploreAnalytics = () => {
  const navigate = Navigator();

  return (
    <div className=" fixed px-4 w-full  h-full z-[50] -mt-8 bg-opacity-50 ">
      <div className="dark:bg-gray-600 bg-white w-full h-full  rounded-lg p-3 border-[1px]">
        <div className="w-full flex justify-end">
          <button
            onClick={() => navigate("../")}
            className="bg-gray-700 px-2 rounded-md"
          >
            Close
          </button>
        </div>
        <h1 className="w-full text-center text-gray-700">ExploreAnalytics</h1>
        <div className="">
          <div className="  dark:bg-gray-900 bg-gray-600 flex py-2 space-x-2 px-3 rounded-tl-md">
            <div className="bg-gray-700 rounded-md p-1 px-2">option1</div>
            <div className="bg-gray-700 rounded-md p-1 px-2">indicators</div>
            <div className="bg-gray-700 rounded-md p-1 px-2">indicators</div>
            <div className="bg-gray-700 rounded-md p-1 px-2">indicators</div>
          </div>
          <div className="flex space-">
            <div className="p-2  w-16 dark:bg-gray-900 bg-gray-600 rounded-b-lg ">
              <ul className=" space-y-1">
                <li className="w-full bg-gray-700 rounded-md p-2 px-3">
                  <img src="/icons/Line_light.svg" className="w-full" />
                </li>
                <li className="w-full bg-gray-700 rounded-md p-2 px-3">
                  <img src="/icons/volatility.svg" className="w-full" />
                </li>
                <li className="w-full bg-gray-700 rounded-md p-2 px-3">
                  <img src="/icons/trending up.png" className="w-full" />
                </li>
              </ul>
            </div>
            <div className="w-[96%] p-2">
              <PriceChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreAnalytics;
