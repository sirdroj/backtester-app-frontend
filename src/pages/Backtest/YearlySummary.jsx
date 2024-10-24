import { useState, useRef } from "react";
import { YearlySummaryTableData } from "./Test_data";
import { YearlySummaryTable } from "./YearlySummaryTable";
import BarChart from "../../components/charts/BarChart";

const YearlySummary = () => {
  const [leftWidth, setLeftWidth] = useState(50); // Initial width for the left section
  const [showPopup, setShowPopup] = useState(false); // State to handle popup visibility
  const [popUpElement, setPopUpElement] = useState(1); // State to manage popup content
  const resizeRequestRef = useRef(null); // To store animation frame ID

  const handleMouseDown = (e) => {
    const handleMouseMove = (moveEvent) => {
      if (resizeRequestRef.current) return; // Prevent multiple requests

      resizeRequestRef.current = requestAnimationFrame(() => {
        const newLeftWidth = (moveEvent.clientX / window.innerWidth) * 100;
        if (newLeftWidth > 20 && newLeftWidth < 80) {
          setLeftWidth(newLeftWidth);
        }
        resizeRequestRef.current = null; // Clear request ID after update
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

  // Popup content map
  const popUpDC = {
    1: (
      <YearlySummaryTable
        products={YearlySummaryTableData}
        tableTheme={"dark"}
      />
    ),
    2: (
      <BarChart
        equity_Table_data={YearlySummaryTableData}
        title="Yearly Summary"
      />
    ),
  };

  return (
    <div className="flex mt-2 h-[470px]">
      {/* Popup Overlay */}
      {showPopup && (
        <div
          id="popup"
          className="fixed inset-0 w-full h-full bg-white bg-opacity-20 backdrop-blur-sm z-[100] w-full justify-center items-center"
        >
          <div className="p-2 rounded-md shadow-lg  flex justify-end ">
            <button
              onClick={() => setShowPopup(false)}
              className=" bg-red-300 text-red-900 px-4 p-1 rounded-md"
            >
              Close
            </button>
          </div>
          <div className="p-5 h-[90%] w-[full]">{popUpDC[popUpElement]}</div>
        </div>
      )}

      {/* Left section */}
      <div className="" style={{ width: `${leftWidth}%` }}>
        <div className="flex justify-end">
          <button
            className="p- border-[1px] rounded-md px-2 text-sm"
            onClick={() => {
              setPopUpElement(1); // Show the Yearly Summary Table in fullscreen
              setShowPopup(true);
            }}
          >
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
        <div className="text-white flex justify-center px-2">
          <YearlySummaryTable
            products={YearlySummaryTableData}
            tableTheme={"dark"}
          />
        </div>
      </div>

      {/* Divider */}
      <div
        className="w-2 bg-gray-500 cursor-col-resize"
        onMouseDown={handleMouseDown}
      ></div>

      {/* Right section */}
      <div className="flex-grow">
        <div className="flex justify-end">
          <button
            className="p- border-[1px] rounded-md px-2 text-sm"
            onClick={() => {
              setPopUpElement(2); // Show the BarChart in fullscreen
              setShowPopup(true);
            }}
          >
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
            </svg>{" "}
          </button>
        </div>
        <div className="pt-2 text-white">
          <BarChart
            equity_Table_data={YearlySummaryTableData}
            title="Yearly Summary"
          />
        </div>
      </div>
    </div>
  );
};

export default YearlySummary;
