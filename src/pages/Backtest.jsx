import React, { useEffect, useRef, useState } from "react";

const Backtest = () => {
  const pathRef = useRef(null);
  const [selected, setSelected] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index

  const items = [
    "Technical Filters",
    "Fundamental Filters",
    "Strategy Type",
    "Combine Filters",
    "Portfolio Filters",
    "Portfolio Filters",
    "Invest/Trade/Periods",
  ];

  const itemRefs = useRef([]);

  const updateItemPositions = () => {
    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    const centerIndex = Math.floor(items.length / 2);

    items.forEach((_, index) => {
      const relativeIndex = index - currentIndex + 3; // Adjust for circular behavior
      const point = path.getPointAtLength(
        (totalLength / (items.length + 1)) * (relativeIndex + 1)
      );

      const item = itemRefs.current[index];
      if (item) {
        const distanceFromCenter = Math.abs(centerIndex - relativeIndex);
        const scale = 1 - distanceFromCenter * 0.2; // Scale based on distance from center

        item.style.position = "absolute";
        item.style.left = `${point.x - 10}px`;
        item.style.top = `${point.y - 30}px`;
        item.style.transform = `scale(${Math.max(scale, 0.5)})`; // Prevent scale from going negative
        item.style.transition =
          "left 0.5s ease, top 0.5s ease, transform 0.5s ease"; // Smooth transitions
      }
    });
  };

  useEffect(() => {
    updateItemPositions();
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex == 6) {
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next item
  };

  const handlePrev = () => {
    if (currentIndex == 0) {
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex - 1); // Move to the previous item
  };

  return (
    <div className="flex justify-end mx-20 h-[700px]  ">
      <div className=" w-[35%] z-1 h-full left-0 top-0  ">
        <img
          src="/images/fundamentalFilter_badge.png"
          className=" mx-auto left-[-3rem] top-[160px] absolute w-[250px]"
        />
        {currentIndex}
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => setCurrentIndex(index)}
              className={`${
                currentIndex === index
                  ? "shadow-[0_0_5px_5px_rgba(255,255,255,0.5)] bg-slate-100"
                  : "bg-slate-100"
              } cursor-pointer p-3 items-center  text-center relative  border-[1px] border-[#111F29] text-black w-48 text-[14px] font-semibold rounded-xl z-[1000]`}
            >
              {item}

              <svg
                width="100"
                height="150"
                className={`${
                  currentIndex == index
                    ? " rotate-y-0 duration-300  opacity-100 z-0"
                    : " right-[-50px] opacity-10  "
                } absolute bottom-[-79px] right-[-100px]`}
              >
                <circle cx="40" cy="50" r="5" fill="white" />
                <path
                  d="M0,50 L40,50"
                  stroke="white"
                  stroke-width="2"
                  fill="none"
                />
              </svg>
            </li>
          ))}
        </ul>
        <svg
          width="600"
          height="800"
          className="absolute top-[-0px]  border-[0px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="arch"
            ref={pathRef}
            d={`M 100,0 A 600,600 0 0,1 100,${window.innerHeight + 30}`}
            fill="none"
            stroke="white"
            strokeWidth="1"
            className="h-screen border-[1px]"
          />
        </svg>
      </div>

      <div className="w-[75%] relative left-[-55px] top-10">
        <div
          className="m-2 w-[100%] relative h-[400px] bg-black bg-opacity-10 rounded-lg"
          style={{ boxShadow: "0 0 10px 4px rgba(255, 255, 255, 0.2)" }}
        >
          <div className="relative my-[1%] h-[98%] overflow-y-scroll">
            <section className="relative">
              {items.map((item,index) => (
                <div className="px-4 p-2" >
                  <h2 className="flex border-b-[1px] items-center text-[20px] px-4">
                    <img
                      className="w-[35px] relative top-[3px] mx-2"
                      src="./icons/trending up.png"
                    />
                    {item}
                  </h2>
                  <p className="text-center pt-1 pb-4 text-[12px]">
                    Some info about trends and what is trends
                  </p>
                  <form className="inputs px-2">
                    <div className="flex justify-between items-center">
                      <label>Moving Averages(MA)</label>
                      <select
                        id="states"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                      >
                        <option value="SA">Simple MA</option>
                        <option value="CMA">some MA</option>
                      </select>
                    </div>
                  </form>
                </div>
              ))}
              <div className="mt-10 w-full p-4 flex justify-end">
                <div className="z-10 px-2 w-20 leftbutton h-7 bg-black border-white border-[1px] bg-opacity-10 flex items-center justify-center rounded-full cursor-pointer">
                  Save
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="flex justify-between mt-0 text-[12px]">
          <div
            onClick={handlePrev}
            className=" cursor-pointer px-6 py-1 m-2 active:shadow-none shadow-lg sha bg-gray-300 bg-opacity-5 rounded-lg border-[1px] border-[#41253B]"
            // style={{ boxShadow: " 0 0 10px 4px rgba(0, 0, 0, 0.3)" }}
          >
            Prev
          </div>
          <div
            onClick={handleNext}
            className=" cursor-pointer px-6 py-1 m-2 active:shadow-none shadow-lg sha bg-gray-300 bg-opacity-5 rounded-lg border-[1px] border-[#41253B]"
            style={{ boxShadow: "inset 0 0 10px 4px rgba(0, 0, 0, 0.3)" }}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backtest;
