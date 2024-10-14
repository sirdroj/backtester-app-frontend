import { useState } from "react";
import EquityCurve from "./EquityCurve";
import { Table } from "../../components/Table";
import { equityTable } from "./Test_data";
import { TableEquity } from "./TableEquity";

const ResizableSections = () => {
  const equity_Table_data = equityTable;

  const [leftWidth, setLeftWidth] = useState(50); // Initial width for the left section

  const handleMouseDown = (e) => {
    const startX = e.clientX;

    const handleMouseMove = (moveEvent) => {
      const newLeftWidth =
        ((moveEvent.clientX - startX) / window.innerWidth) * 100 + leftWidth;
      if (newLeftWidth > 20 && newLeftWidth < 80) {
        setLeftWidth(newLeftWidth);
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    // Add the listeners for dragging
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex  mt-5  ">
      {/* Left section */}
      <div className="" style={{ width: `${leftWidth}%` }}>
        <div className=" p- text-white flex justify-center">
          <TableEquity products={equity_Table_data} tableTheme={"dark"} />
        </div>
      </div>

      {/* Divider */}
      <div
        className="w-2 bg-gray-500 cursor-col-resize"
        onMouseDown={handleMouseDown}
      ></div>

      {/* Right section */}
      <div className=" flex-grow">
        <div className=" pt-2 text-white">
          <EquityCurve equity_Table_data={equity_Table_data}/>
        </div>
      </div>
    </div>
  );
};

export default ResizableSections;
