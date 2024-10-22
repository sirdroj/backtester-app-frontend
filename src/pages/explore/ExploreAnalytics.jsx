import React, { useEffect, useRef } from "react";
import PriceChart from "./PriceChart";
import { Navigator } from "../../assets/utils/Navigator";
import useResizable from "../../assets/utils/useResizable";

const ExploreAnalytics = () => {
  const navigate = Navigator();
  const parentRef = useRef(null); // Ref for the parent element
  const [leftWidth, handleMouseDown] = useResizable(40, parentRef); // Pass ref to the hook

  // Sample data for the table
  const tableData = [
    { label: "Expenses", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Operating Profit", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Profit Before Tax", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Expenses", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Operating Profit", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Profit Before Tax", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Expenses", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Operating Profit", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Profit Before Tax", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Expenses", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Operating Profit", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Profit Before Tax", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Expenses", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Operating Profit", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Profit Before Tax", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Expenses", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Operating Profit", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Profit Before Tax", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Profit Before Tax", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Expenses", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Operating Profit", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Profit Before Tax", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Expenses", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Operating Profit", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Profit Before Tax", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Profit Before Tax", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Expenses", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Operating Profit", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Profit Before Tax", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Expenses", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Operating Profit", last: 4104, change: 235.2, yoyGrowth: 235.2 },
    { label: "Profit Before Tax", last: 4104, change: 235.2, yoyGrowth: 235.2 },
  ];

  // Cleanup for event listeners on unmount
  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseDown);
    };
  }, [handleMouseDown]);

  return (
    <div className="fixed px-4 w-full h-full z-[50] -mt-8 bg-opacity-50">
      <div className="dark:bg-gray-600 bg-gray-300 bg-opacity-45 w-full h-full rounded-lg p-3">
        <div className="w-full flex justify-end p-1">
          <button
            onClick={() => navigate("../")}
            aria-label="Close"
            className="bg-gray-700 px-2 rounded-md"
          >
            Close
          </button>
        </div>
        <div className="h-full">
          <div className="dark:bg-gray-900 bg-gray-600 flex py-2 space-x-2 px-3 rounded-tl-md">
            <div className="bg-gray-700 rounded-md p-1 px-2">option1</div>
            <div className="bg-gray-700 rounded-md p-1 px-2">indicators</div>
            <div className="bg-gray-700 rounded-md p-1 px-2">indicators</div>
            <div className="bg-gray-700 rounded-md p-1 px-2">indicators</div>
          </div>
          <div className="flex">
            <div className="p-2 w-16 dark:bg-gray-900 bg-gray-600 rounded-b-lg">
              <ul className="space-y-1">
                <li className="w-full bg-gray-700 rounded-md p-2 px-3">
                  <img src="/icons/Line_light.svg" className="w-full" alt="Line Chart" />
                </li>
                <li className="w-full bg-gray-700 rounded-md p-2 px-3">
                  <img src="/icons/volatility.svg" className="w-full" alt="Volatility Indicator" />
                </li>
                <li className="w-full bg-gray-700 rounded-md p-2 px-3">
                  <img src="/icons/trending up.png" className="w-full" alt="Trending Up Indicator" />
                </li>
              </ul>
            </div>
            <div className="w-[96%] p-2 flex" ref={parentRef}>
              <div className="h-full" style={{ width: `${leftWidth}%` }}>
                <PriceChart />
              </div>

              <div
                className="w-2 bg-gray-500 cursor-col-resize"
                onMouseDown={handleMouseDown}
              ></div>
              <div className="h-[450px] overflow-auto  " style={{ width: `${99 - leftWidth}%` }}>
                <table className="rounded-md  w-full bg-gray-800 ">
                  <thead>
                    <tr>
                      <th className="border-b-[1px]">Sales-</th>
                      <th className="border-[1px]">Last</th>
                      <th className="border-[1px]">Chg</th>
                      <th className="border-[1px]">YOY Sales Growth %</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {tableData.map((row, index) => {
                      let tdclass="border-x-[1px] border-gray-700 text-center  ";

                      return(
                      <tr key={index}>
                        <td className={tdclass}>{row.label}</td>
                        <td className={tdclass}>{row.last}</td>
                        <td className={tdclass}>{row.change}</td>
                        <td className={tdclass}>{row.yoyGrowth}</td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreAnalytics;
