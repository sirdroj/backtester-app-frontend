import { useState, useRef } from "react";
import { Table } from "../../components/Table";
import { equityTable } from "./Test_data";
import { TableEquity } from "./TableEquity";
import EquityChart from "./EquityChart";

const EquityCurve = () => {
  const equity_Table_data = equityTable;

  const [leftWidth, setLeftWidth] = useState(40); // Initial width for the left section
  const resizeRequestRef = useRef(null); // To store animation frame ID

  const handleMouseDown = (e) => {
    const initialLeftWidth = leftWidth;

    const handleMouseMove = (moveEvent) => {
      if (resizeRequestRef.current) return; // Prevent multiple requests

      resizeRequestRef.current = requestAnimationFrame(() => {
        const newLeftWidth = (moveEvent.clientX / window.innerWidth) * 100;
        if (newLeftWidth > 20 && newLeftWidth < 50) {
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
      <div className="flex w-[90%] mt-0 h-[470px]">
        {/* Left section */}
        <div className="h-full" style={{ width: `${leftWidth}%` }}>
          <div className="text-white flex justify-center h-full">
            <TableEquity products={equity_Table_data} tableTheme={"dark"} />
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-2 bg-gray-500 cursor-col-resize"
          onMouseDown={handleMouseDown}
        ></div>

        {/* Right section */}
        <div className=" w-full " >
          <div className="pt-2 px-2 text-white w-full">
            <EquityChart equity_Table_data={equity_Table_data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquityCurve;
