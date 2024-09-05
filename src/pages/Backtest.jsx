import React, { useEffect, useRef, useState } from "react";

const Backtest = () => {
  const pathRef = useRef(null);
  const [selected, setSelected] = useState(1);
  // const inputs=[
  //   "Trend":
  //   "inputs":[{
  //     "name":"Moving Averages(MA)",
  //     "type":"dropdown",
  //     "options":["some MA","simple MA"]
  //   }],

  // ]
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
        (totalLength / (items.length + 1)) * (index + 1)
      );

      const item = itemRefs.current[index];

      item.style.position = "absolute";
      item.style.left = `${point.x - 100}px`;
      item.style.top = `${point.y - 30}px`;
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
              onClick={() => setSelected(index)}
              className={`${
                selected == index
                  ? "shadow-[0_0_5px_5px_rgba(255,255,255,0.5)] bg-slate-100"
                  : "bg-slate-100"
              } cursor-pointer  p-1 text-center absolute border-[1px] border-[#111F29]  text-black w-48 text-[14px] font-semibold rounded-xl z-[1000]`}
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
        className="m-2 w-[670px] relative h-[400px] bg-black bg-opacity-10 rounded-lg "
        style={{ boxShadow: "0 0 10px 4px rgba(255, 255, 255, 0.2)" }}
      >
        <div className="relative my-[1%]  h-[98%] overflow-y-scroll ">
          <section className="relative ">
            <div className="px-4 p-2">
              <h2 className="flex border-b-[1px] items-center text-[25px] px-4">
                {" "}
                <img
                  className="w-[35px] relative top-[3px] mx-2"
                  src="./icons/trending up.png"
                />
                Trend
              </h2>
              <p className="text-center pt-1 pb-4 text-[12px]">
                Some info about trends and what is trends
              </p>
              <form className="inputs px-2">
                <div className="flex justify-between items-center">
                  <label>Moving Averages(MA)</label>
                  <select
                    id="states"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                  >
                    {/* <option selected>Choose a state</option> */}
                    <option value="SA">Simple MA </option>
                    <option value="CMA">some MA</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="px-4 p-2">
              <h2 className="flex border-b-[1px] items-center text-[25px] px-4">
                {" "}
                <img
                  className="w-[35px] relative top-[3px] mx-2"
                  src="./icons/trending up.png"
                />
                Trend
              </h2>
              <p className="text-center pt-1 pb-4 text-[12px]">
                Some info about trends and what is trends
              </p>
              <form className="inputs px-2">
                <div className="flex justify-between items-center">
                  <label>Moving Averages(MA)</label>
                  <select
                    id="states"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                  >
                    {/* <option selected>Choose a state</option> */}
                    <option value="SA">Simple MA </option>
                    <option value="CMA">some MA</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="px-4 p-2">
              <h2 className="flex border-b-[1px] items-center text-[25px] px-4">
                {" "}
                <img
                  className="w-[35px] relative top-[3px] mx-2"
                  src="./icons/trending up.png"
                />
                Trend
              </h2>
              <p className="text-center pt-1 pb-4 text-[12px]">
                Some info about trends and what is trends
              </p>
              <form className="inputs px-2">
                <div className="flex justify-between items-center">
                  <label>Moving Averages(MA)</label>
                  <select
                    id="states"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                  >
                    {/* <option selected>Choose a state</option> */}
                    <option value="SA">Simple MA </option>
                    <option value="CMA">some MA</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="px-4 p-2">
              <h2 className="flex border-b-[1px] items-center text-[25px] px-4">
                {" "}
                <img
                  className="w-[35px] relative top-[3px] mx-2"
                  src="./icons/trending up.png"
                />
                Trend
              </h2>
              <p className="text-center pt-1 pb-4 text-[12px]">
                Some info about trends and what is trends
              </p>
              <form className="inputs px-2">
                <div className="flex justify-between items-center">
                  <label>Moving Averages(MA)</label>
                  <select
                    id="states"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                  >
                    {/* <option selected>Choose a state</option> */}
                    <option value="SA">Simple MA </option>
                    <option value="CMA">some MA</option>
                  </select>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Backtest;
