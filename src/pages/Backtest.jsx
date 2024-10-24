import React, { useEffect, useRef, useState } from "react";
// import TechnicalFiltersForm from "../components/forms/technicalFiltersForm";
import FundamentalForm from "../components/backtest forms/FundamentalForm";
import Test from "../components/backtest forms/Test";
import StrategyType from "../components/backtest forms/StrategyType";
import TechnicalForm2 from "../components/backtest forms/TechnicalForm2";
import CombineFilters from "../components/backtest forms/CombineFilters";
import TradeInvestPeriod from "../components/backtest forms/TradeInvestPeriod";
import Portfolio_filters from "../components/backtest forms/Portfolio_filters";
import RiskManagement from "../components/backtest forms/RiskManagement";
import { Link } from "react-router-dom";

const Backtest = () => {
  const pathRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index

  const [formData, setFormData] = useState({
    Trend: { indicator: "", period: "", priceField: "", quantity: 0 },
    Momentum: { indicator: "", period: "", priceField: "", quantity: 0 },
    Volatility: { indicator: "", period: "", priceField: "", quantity: 0 },
    Volume: { indicator: "", period: "", priceField: "", quantity: 0 },
    Breadth: { indicator: "", period: "", priceField: "", quantity: 0 },
  });

  const dc = {
    0: <TechnicalForm2 />,
    1: <FundamentalForm />,
    2: <StrategyType />,
    3: <CombineFilters />,
    4: <TradeInvestPeriod />,
    5: <Portfolio_filters />,
    6: <RiskManagement />,
  };
  const items = [
    "Technical Filters",
    "Fundamental Filters",
    "Strategy Type",
    "Combine Filters",
    "Invest/Trade/Periods",
    "Portfolio Filters",
    "Risk Management",
  ];

  const [count, setCount] = useState(0);

  const inputDataTypes = {
    "Technical Filters": [
      {
        name: "Trend",
        icon: "./icons/trending up.png",
        inputs: [
          {
            name: "indicator",
            type: "select",
            options: ["Simple MA", "some MA"],
          },
          { name: "period", type: "select", options: ["Days", "Year"] },
          {
            name: "priceField",
            type: "select",
            options: ["Price A", "Price B"],
          },
          { name: "quantity", type: "number" },
        ],
      },
      {
        name: "Momentum",
        icon: "./icons/momentum.svg",
        inputs: [
          {
            name: "indicator",
            type: "select",
            options: ["Simple MA", "some MA"],
          },
          { name: "period", type: "select", options: ["Days", "Year"] },
          {
            name: "priceField",
            type: "select",
            options: ["Price A", "Price B"],
          },
          { name: "quantity", type: "number" },
        ],
      },
      {
        name: "Volatility",
        icon: "./icons/volatility.svg",
        inputs: [
          {
            name: "indicator",
            type: "select",
            options: ["Simple MA", "some MA"],
          },
          { name: "period", type: "select", options: ["Days", "Year"] },
          {
            name: "priceField",
            type: "select",
            options: ["Price A", "Price B"],
          },
          { name: "quantity", type: "number" },
        ],
      },
      {
        name: "Volume",
        icon: "./icons/volume.svg",
        inputs: [
          {
            name: "indicator",
            type: "select",
            options: ["Simple MA", "some MA"],
          },
          { name: "period", type: "select", options: ["Days", "Year"] },
          {
            name: "priceField",
            type: "select",
            options: ["Price A", "Price B"],
          },
          { name: "quantity", type: "number" },
        ],
      },
      {
        name: "Breadth",
        icon: "./icons/breath.svg",
        inputs: [
          {
            name: "indicator",
            type: "select",
            options: ["Simple MA", "some MA"],
          },
          { name: "period", type: "select", options: ["Days", "Year"] },
          {
            name: "priceField",
            type: "select",
            options: ["Price A", "Price B"],
          },
          { name: "quantity", type: "number" },
        ],
      },
    ],
  };

  const handleChange = (filterName, inputName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [filterName]: {
        ...prevFormData[filterName],
        [inputName]: value,
      },
    }));
  };

  // Technical_Filters=[
  //     "Trend",
  //     "Momentum",
  //     "Volatility",
  //     "Volume",
  //     "Breadth"
  //   ]

  const itemRefs = useRef([]);

  const updateItemPositions = () => {
    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    const centerIndex = Math.floor(items.length / 2);

    items.forEach((_, index) => {
      const relativeIndex = index - currentIndex + 3; // Adjust for circular behavior
      const point = path.getPointAtLength(
        (totalLength / (items.length + 0)) * (relativeIndex + 1)
      );

      const item = itemRefs.current[index];
      if (item) {
        const distanceFromCenter = Math.abs(centerIndex - relativeIndex);
        const scale = 1 - distanceFromCenter * 0.2; // Scale based on distance from center

        item.style.position = "absolute";
        item.style.left = `${point.x - 150}px`;
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
    <div className="flex p-20 px-0 w-screen  h-[1080px]  fixed left-0 top-0 text-white border-[px]">
      <div className="relative w-[285px] z-1   top-[-9%]  ">
        {/* <img
          src="/images/bt_badge.png"
          className=" mx-auto left-[-5rem] top-[220px] absolute w-[290px]"
        /> */}
        <div className="h-screen flex items-center justify-center absolute left-[20px]">
          <div className=" space-y-80 z-[100]">
            <div
              className=" z-10 rightbutton w-10 h-10 bg-black border-gray-700 border-[1px] bg-opacity-10 flex items-center justify-center rounded-full cursor-pointer"
              onClick={handlePrev}
            >
              <b>&#8593;</b>
            </div>
            <div
              className=" z-10 rightbutton w-10 h-10 bg-black border-gray-700 border-[1px] bg-opacity-10 flex items-center justify-center rounded-full cursor-pointer"
              onClick={handleNext}
            >
              <b>&#8595;</b>
            </div>
          </div>
        </div>
        <div className="">
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => setCurrentIndex(index)}
                className={`${
                  currentIndex === index
                    ? "shadow-[0_0_5px_5px_rgba(255,255,255,0.5)] bg-slate-100 dark:bg-gray-700 dark:bg-opacity-100 dark:text-gray-100"
                    : "bg-slate-100 dark:bg-gray-700 z-10 dark:text-gray-300 dark:bg-opacity-100"
                } cursor-pointer    p-3 items-center  text-center relative  border-[1px] border-[#111F29] text-black w-48 text-[14px] font-semibold rounded-xl z-[1000]`}
              >
                {item}

                <svg
                  width="100"
                  height="150"
                  className={`${
                    currentIndex == index
                      ? " rotate-y-0 duration-300  opacity-100 z-0"
                      : " right-[-50px] opacity-0  "
                  } absolute bottom-[-79px] right-[-100px]`}
                >
                  <circle cx="25" cy="50" r="5" fill="white" />
                  <path
                    d="M0,50 L25,50"
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
            className="absolute  left-[-60px]  border-[0px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="arch"
              ref={pathRef}
              d={`M 150,0 A 700,700 0 0,1 150,${600 + 30}`}
              fill="none"
              stroke="white"
              strokeWidth="1"
              className="h-screen border-[1px]"
            />
          </svg>
        </div>
      </div>

      <div className="w-[1000px]    ">
        <div
          id="formsection"
          className="m-2 w-[100%]  h-[450px] bg-black bg-opacity-10 rounded-lg"
          style={{ boxShadow: "0 0 10px 4px rgba(255, 255, 255, 0.2)" }}
        >
          <div className="relative my-[1%] h-[98%] overflow-y-scroll">
          <div className="flex justify-end border-b-[1px] border-gray-700 text-sm">
          <Link to={"./logs"}
              className=" cursor-pointer px-6 py-1 m-1 active:shadow-none shadow-lg sha bg-gray-300 bg-opacity-5 rounded-lg border-[1px] border-[#41253B] "
            >
              View logs
            </Link>
          </div>
            <section className="relative">
              {dc[currentIndex]}

              <div className="mt-10 w-full p-4 flex justify-end">
                {/* <div className="z-10 px-2 w-20 leftbutton h-7 bg-black border-white border-[1px] bg-opacity-10 flex items-center justify-center rounded-full cursor-pointer">
                  Save
                </div> */}
              </div>
            </section>
          </div>
        </div>

        <div className="flex justify-between px-10 mt-0 text-[12px]">
          <div
            onClick={handlePrev}
            className=" cursor-pointer px-6 py-1 m-2 active:shadow-none shadow-lg sha bg-gray-300 bg-opacity-5 rounded-lg border-[1px] border-[#41253B]"
          >
            Prev
          </div>
          {currentIndex != 6 && (
            <div
              onClick={handleNext}
              className=" cursor-pointer px-6 py-1 m-2 active:shadow-none shadow-lg sha bg-gray-300 bg-opacity-5 rounded-lg border-[1px] border-[#41253B]"
              style={{ boxShadow: "inset 0 0 10px 4px rgba(0, 0, 0, 0.3)" }}
            >
              Next
            </div>
          )}
          {currentIndex == 6 && (
            <Link to={"./logs"}>
              <div
                className=" flex cursor-pointer pl-6 px-5 py-1 m-2 active:shadow-none shadow-lg sha bg-green-300 bg-opacity-10 rounded-lg border-[1px] border-green-400"
                style={{ boxShadow: "inset 0 0 10px 4px rgba(0, 0, 0, 0.3)" }}
              >
                Start BackTest
                <svg width="20" height="20" className={``}>
                  <circle
                    cx="15"
                    cy="10"
                    r="5"
                    fill="#05FF00"
                    className="z-0"
                  />
                </svg>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Backtest;
