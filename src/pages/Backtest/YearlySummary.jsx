import { useState, useRef } from "react";
import { YearlySummaryTableData } from "./Test_data";
import { YearlySummaryTable } from "./YearlySummaryTable";
import BarChart from "../../components/charts/BarChart";

const YearlySummary = () => {
  const [leftWidth, setLeftWidth] = useState(50); // Initial width for the left section
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

  return (
    <div className="flex mt-2 h-[470px]">
      {/* Left section */}
      <div className="" style={{ width: `${leftWidth}%` }}>
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
