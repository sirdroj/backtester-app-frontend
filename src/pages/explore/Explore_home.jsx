import React, { useEffect, useRef, useState } from "react";
// import TechnicalFiltersForm from "../components/forms/technicalFiltersForm";
import FundamentalForm from "../../components/backtest forms/FundamentalForm";
import StrategyType from "../../components/backtest forms/StrategyType";
import TechnicalForm2 from "../../components/backtest forms/TechnicalForm2";
import CombineFilters from "../../components/backtest forms/CombineFilters";
import { Link } from "react-router-dom";
import TechnicalFormExplorer from "../../components/Explore forms/TechnicalFormExplorer";
import FundamentalFormExplore from "../../components/Explore forms/FundamentalFormExplore";
import StrategyTypeExplorer from "../../components/Explore forms/StrategyTypeExplorer";
import CombineFiltersExplorer from "../../components/Explore forms/CombineFiltersExplorer";
import useStore from "../../stores/useStore";

const Explore_home = () => {
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
    0: <TechnicalFormExplorer />,
    1: <FundamentalFormExplore />,
    2: <StrategyTypeExplorer />,
    3: <CombineFiltersExplorer />,
  };
  const items = [
    "Technical Filters",
    "Fundamental Filters",
    "Strategy Type",
    "Combine Filters",
  ];

  const [count, setCount] = useState(0);
  const {theme}=useStore()

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
      const relativeIndex = index - currentIndex + 2; // Adjust for circular behavior
      const point = path.getPointAtLength(
        (totalLength / (items.length + 0)) * relativeIndex
      );

      const item = itemRefs.current[index];
      if (item) {
        const distanceFromCenter = Math.abs(centerIndex - relativeIndex);
        const scale = 1 - distanceFromCenter * 0.2; // Scale based on distance from center

        item.style.position = "absolute";
        item.style.left = `${point.x - 30}px`;
        item.style.top = `${point.y}px`;
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
    if (currentIndex == 3) {
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
    <div className="flex justify-end p-20 px-10 w-screen  h-screen  fixed top-0 text-white  ">
      <div className="relative w-[35%] z-1  left-[-35px] top-[-100px]  ">
        <img
          src="/images/exploreBadge.png"
          className=" mx-auto left-[-5rem] top-[190px] absolute w-[290px]"
        />
        <div className="">
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => setCurrentIndex(index)}
                className={`${
                  currentIndex === index
                    ? "shadow-[0_0_5px_5px_rgba(255,255,255,0.5)] dark:bg-gray-700 bg-white dark:text-gray-300"
                    : "dark:bg-gray-700 bg-white dark:text-gray-300 "
                } cursor-pointer   p-3 items-center  text-center relative  border-[1px] border-[#111F29] text-black w-48 text-[14px] font-semibold rounded-xl z-[1000]`}
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
                  <circle cx="50" cy="50" r="5" fill="white" />
                  <path
                    d="M0,50 L50,50"
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
            className="absolute top-[-00px] left-[60px]  border-[0px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="arch"
              ref={pathRef}
              d={`M 70,0 A 600,600 0 0,1 100,${window.innerHeight + 30}`}
              fill="none"
              stroke="white"
              strokeWidth="1"
              className="h-screen border-[1px]"
            />
          </svg>
        </div>
      </div>

      <div className="w-[89%]  relative left-[-10px] ">
        <div
          id="formsection"
          className="m-2 w-[100%] relative h-[450px] bg-black bg-opacity-10 rounded-lg"
          style={{ boxShadow: "0 0 10px 4px rgba(255, 255, 255, 0.2)" }}
        >
          <div className="flex justify-end border-b-[1px] border-gray-700 text-sm">
          <Link to={"/explore/logs"}
              className=" cursor-pointer px-6 py-1 m-1 active:shadow-none shadow-lg sha bg-gray-300 bg-opacity-5 rounded-lg border-[1px] border-[#41253B] "
            >
              View logs
            </Link>
          </div>
          <div className="relative my-[1%] h-[90%] overflow-y-scroll">
            <section className="relative">
              {dc[currentIndex]}

              <div className="mt-10 w-full p-4 flex justify-end">
                <div className="z-10 px-2 w-20 leftbutton h-7 bg-black border-white border-[1px] bg-opacity-10 flex items-center justify-center rounded-full cursor-pointer">
                  Save
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="flex justify-between mx-10 mt-0 text-[12px]">
          <div
            onClick={handlePrev}
            className=" cursor-pointer px-6 py-1 m-2 active:shadow-none shadow-lg sha bg-gray-300 bg-opacity-5 rounded-lg border-[1px] border-[#41253B]"
          >
            Prev
          </div>
          {currentIndex != 3 && (
            <div
              onClick={handleNext}
              className=" cursor-pointer px-6 py-1 m-2 active:shadow-none shadow-lg sha bg-gray-300 bg-opacity-5 rounded-lg border-[1px] border-[#41253B]"
              style={{ boxShadow: "inset 0 0 10px 4px rgba(0, 0, 0, 0.3)" }}
            >
              Next
            </div>
          )}
          {currentIndex == 3 && (
            <Link to={"/explore/logs"}>
              <div
                onClick={handleNext}
                className=" flex cursor-pointer pl-6 px-5 py-1 m-2 active:shadow-none shadow-lg sha bg-green-300 bg-opacity-10 rounded-lg border-[1px] border-green-400"
                style={{ boxShadow: "inset 0 0 10px 4px rgba(0, 0, 0, 0.3)" }}
              >
                Explore
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

export default Explore_home;
