import { useState, useRef } from "react";
import { Table } from "../../components/Table";
import { equityTable } from "./Test_data";
import { TableEquity } from "./TableEquity";
import EquityChart from "./EquityChart";

const EquityCurve = () => {
  const equity_Table_data = equityTable;
  const [showPopup, setShowPopup] = useState(false);
  const [popUpElement, setPopUpElement] = useState(1);
  const [leftWidth, setLeftWidth] = useState(40); // Initial width for the left section
  const resizeRequestRef = useRef(null); // To store animation frame ID

  const popUpDC = {
    1: <TableEquity products={equity_Table_data} tableTheme={"dark"} />,
    2: <EquityChart equity_Table_data={equity_Table_data} />,
  };

  const handleMouseDown = (e) => {
    const initialLeftWidth = leftWidth;

    const handleMouseMove = (moveEvent) => {
      if (resizeRequestRef.current) return; // Prevent multiple requests

      resizeRequestRef.current = requestAnimationFrame(() => {
        const newLeftWidth = (moveEvent.clientX / window.innerWidth) * 100;
        if (newLeftWidth > 20 && newLeftWidth < 80) {
          setLeftWidth(newLeftWidth);
        }
        resizeRequestRef.current = null; // Clear the request ID after update
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (resizeRequestRef.current) {
        cancelAnimationFrame(resizeRequestRef.current); // Cancel any pending frame
        resizeRequestRef.current = null;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex items-center w-full pt-1 ">
      {showPopup && <div
        id="popup"
        className={`fixed inset-0 w-full h-full bg-white bg-opacity-20 backdrop-blur-sm z-[100]  items-center`}
      >
        <div className=" p-2 rounded-md shadow-l flex justify-end">
          <button
            onClick={() => setShowPopup(false)} // Example function to close the popup
            className=" bg-red-300 text-red-900 px-4 p-1 rounded-md"
          >
            Close
          </button>
        </div>

        <div className="w-full justify-center flex p-5 h-[90%]">{popUpDC[popUpElement]}</div>
      </div>}

      <div className="p-2 mt- w-16 dark:bg-gray-900 bg-gray-600 rounded-lg h-[480px]">
        <ul className="space-y-1">
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
      <div className="flex w-[95%] mt-0 h-[470px]">
        {/* Left section */}
        <div className="h-full" style={{ width: `${leftWidth}%` }}>
          <div className="flex justify-end">
            <button className="p- border-[1px] rounded-md px-2 text-sm flex" onClick={()=>{
              setPopUpElement(1)
              setShowPopup(true)
            }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            </button>
          </div>
          <div className="text-white flex justify-center h-full mt-1">
            <TableEquity products={equity_Table_data} tableTheme={"dark"} />
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-2 bg-gray-500 cursor-col-resize"
          onMouseDown={handleMouseDown}
        ></div>

        {/* Right section */}
        <div className=" w-full " style={{ width: `${99 - leftWidth}%` }}>
          <div className="flex justify-end">
            <button className="p- border-[1px] rounded-md px-2 text-sm" onClick={()=>{
              setPopUpElement(2)
              setShowPopup(true)
            }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            </button>
          </div>

          <div className="pt-2 px-2 text-white  ">
            <EquityChart equity_Table_data={equity_Table_data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquityCurve;
