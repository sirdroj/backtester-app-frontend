import React, { useEffect, useRef, useState } from "react";




const [selected,setSelected]=useState(1)




const Backtest = () => {
  const pathRef = useRef(null);
  const items = [
    "Technical Filters",
    "Fundamental Filters",
    "Fundamental2 Filters",
    "Fundamental2 Filters",
    "Strategy",
  ];
  const itemRefs = useRef([]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();

    items.forEach((_, index) => {
      const point = path.getPointAtLength(
        (totalLength / (items.length +1)) * (index+1 )
      );

      const item = itemRefs.current[index];

      item.style.position = "absolute";
      item.style.left = `${point.x - 100}px`;
      item.style.top = `${point.y-20 }px`;
    });
  }, [items]);

  return (
    <div className="flex justify-end mx-20  overflow-hidden">
      <div className="absolute w-1/3 z-1 h-full left-0 top-0  overflow-hidden">
        <img
          src="/images/fundamentalFilter_badge.png"
          // src="/images/bt_badge.png"
          className=" mx-auto left-[-3rem] top-[160px] absolute w-[250px]"
        />
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`${true?"shadow-[0_0_10px_5px_rgba(255,255,255,0.5)]":""}  p-1 text-center absolute border-[2px] border-[#111F29] bg-white shadow-white text-black w-52 font-bold rounded-full z-[1000]`}
            >
              {item}
            </li>
          ))}
        </ul>
        <svg
          width="600"
          height="600"
          className="absolute top-[-0px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef} // <-- Correctly referencing the <path> element
            d="M 200,0 A 600,600 0 0,1 200,600"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div
        className="m-2 w-96 bg-black bg-opacity-10 h-96 rounded-lg"
        style={{ boxShadow: "0 0 10px 4px rgba(255, 255, 255, 0.2)" }}
      >
        sdf
      </div>
    </div>
  );
};

export default Backtest;
