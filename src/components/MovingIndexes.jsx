import React from "react";
import useStore from "../stores/useStore";

export const MovingIndexes = () => {
  const { indexTrend } = useStore();

  return (
    <div className="relative overflow-hidden whitespace-nowrap">
      <div className="animate-scroll flex">
        {indexTrend.length > 0 &&
          indexTrend.map((item, index) => (
            <span className="mx-2" key={`${item.title}-${index}`}>
              <b>{item.title} </b>
              <span> {item.current_value} </span>
              <span
                className={`${
                  item.change_percent[0] === "-"
                    ? "text-red-600"
                    : "text-green-400"
                } rotate-z-on-load font-bold`}
              >
                {item.change_percent[0] === "-"?<span>&#9660;</span>:<span>&#9650;</span>}
                 {item.change_percent}
              </span>
            </span>
          ))}
        {/* Duplicate content */}
        {indexTrend.length > 0 &&
          indexTrend.map((item, index) => (
            <span className="mx-2" key={`${item.title}-duplicate-${index}`}>
              <b>{item.title} </b>
              <span> {item.current_value}  </span>
              <span
                className={`${
                  item.change_percent[0] === "-"
                  ? "text-red-600"
                  : "text-green-400"
              } rotate-z-on-load font-bold`}
              >
                {item.change_percent[0] === "-"?<span>&#9660;</span>:<span>&#9650;</span>}
                {item.change_percent}
              </span>
            </span>
          ))}
      </div>
    </div>
  );
};
